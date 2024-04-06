package blog

import (
	"cards/gen/proto/blog"
	"cards/pkg/database"
	"fmt"
	"strings"

	"github.com/upper/db/v4"
)

type Post struct {
	ID      int    `db:"id,omitempty"`
	Title   string `db:"title"`
	Content string `db:"content"`
	Author  string `db:"author"`
}

type Tag struct {
	ID   int    `db:"id,omitempty"`
	Name string `db:"name"`
}

type TagID struct {
	TagID int `db:"tag_id"`
}

func createPost(p *blog.Post) (*blog.Post, error) {
	sess := database.GetSession()

	// Assuming Post is a struct that matches your "posts" table
	newPost := Post{
		Title:   p.Title,
		Content: p.Content,
		Author:  p.Author,
	}

	// Insert the new post into the database
	coll := sess.Collection("posts")
	err := coll.InsertReturning(&newPost) // Use InsertReturning for SQLite
	if err != nil {
		return nil, err
	}

	// No need to call a LastInsertId method; the newPost should now have its ID field set
	// Update the protobuf message's ID with the new ID
	p.Id = int32(newPost.ID)

	return p, nil
}

func getPosts(p *blog.Posts) (*blog.Posts, error) {
	sess := database.GetSession()
	var dbPosts []Post
	var posts []*blog.Post

	res := sess.Collection("posts").Find()

	err := res.All(&dbPosts)
	if err != nil {
		return nil, err
	}

	for _, dbPost := range dbPosts {
		tags, err := getTagsForPost(dbPost.ID)
		if err != nil {
			// Handle error or decide how to proceed if tags cannot be fetched
			return nil, err
		}

		protoTags := ConvertTagsToProtoTags(tags)

		post := &blog.Post{
			Id:      int32(dbPost.ID),
			Title:   dbPost.Title,
			Content: dbPost.Content,
			Author:  dbPost.Author,
			Tags:    protoTags, // Make sure this is the correct field and type for tags
		}

		posts = append(posts, post)
	}

	returnPosts := &blog.Posts{
		Posts: posts,
	}

	return returnPosts, nil
}

func getPostsByTags(tagNames []string) (*blog.Posts, error) {
	sess := database.GetSession()
	var protoPosts []*blog.Post

	// Convert tagNames to interfaceSlice for the SQL query.
	interfaceSlice := make([]interface{}, len(tagNames))
	for i, v := range tagNames {
		interfaceSlice[i] = v
	}

	// Find tag IDs based on tagNames.
	query := fmt.Sprintf("SELECT id FROM tags WHERE name IN (%s)", strings.Repeat("?,", len(tagNames)-1)+"?")
	var tagIDs []int
	res, err := sess.SQL().Query(query, interfaceSlice...)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query for tag IDs: %w", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		if err := res.Scan(&id); err != nil {
			return nil, fmt.Errorf("failed to scan tag ID: %w", err)
		}
		tagIDs = append(tagIDs, id)
	}

	if len(tagIDs) == 0 {
		return &blog.Posts{}, nil // No tags found, return empty result.
	}

	// Reset interfaceSlice for postIDs query.
	interfaceSlice = make([]interface{}, len(tagIDs))
	for i, v := range tagIDs {
		interfaceSlice[i] = v
	}

	// Find posts that have any of these tagIDs.
	query = fmt.Sprintf("SELECT DISTINCT post_id FROM posts_tags WHERE tag_id IN (%s)", strings.Repeat("?,", len(tagIDs)-1)+"?")
	res, err = sess.SQL().Query(query, interfaceSlice...)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query for post IDs: %w", err)
	}
	defer res.Close()

	var postIDs []int
	for res.Next() {
		var postID int
		if err := res.Scan(&postID); err != nil {
			return nil, fmt.Errorf("failed to scan post ID: %w", err)
		}
		postIDs = append(postIDs, postID)
	}

	// Fetch each post by ID and its tags.
	for _, postID := range postIDs {
		dbPost, tags, err := getPost(postID)
		if err != nil {
			return nil, fmt.Errorf("failed to get post: %w", err)
		}
		protoTags := ConvertTagsToProtoTags(tags)
		protoPost := &blog.Post{
			Id:      int32(dbPost.ID),
			Title:   dbPost.Title,
			Content: dbPost.Content,
			Author:  dbPost.Author,
			Tags:    protoTags,
		}
		protoPosts = append(protoPosts, protoPost)
	}

	return &blog.Posts{Posts: protoPosts}, nil
}

func deletePost(postID int) error {
	sess := database.GetSession()

	// First, delete any entries in the posts_tags table associated with this post
	err := sess.Collection("posts_tags").Find(db.Cond{"post_id": postID}).Delete()
	if err != nil {
		return fmt.Errorf("error deleting post tags: %w", err)
	}

	// Then, delete the post itself
	err = sess.Collection("posts").Find(db.Cond{"id": postID}).Delete()
	if err != nil {
		return fmt.Errorf("error deleting post: %w", err)
	}

	return nil
}

// createTag creates a new tag in the database if it doesn't already exist and returns the tag.
func createTag(name string) (*Tag, error) {
	sess := database.GetSession()
	var tag Tag

	// Check if the tag already exists
	exists, err := sess.Collection("tags").Find(db.Cond{"name": name}).Exists()
	if err != nil {
		return nil, err
	}

	if !exists {
		// If the tag doesn't exist, create it
		tag = Tag{
			Name: name,
		}
		_, err = sess.Collection("tags").Insert(tag)
		if err != nil {
			return nil, err
		}
	} else {
		// If the tag exists, retrieve it
		err = sess.Collection("tags").Find(db.Cond{"name": name}).One(&tag)
		if err != nil {
			return nil, err
		}
	}

	return &tag, nil
}

// associateTagWithPost creates an association between a post and a tag in the posts_tags table.
func associateTagWithPost(postID, tagID int) error {
	sess := database.GetSession()

	// Check if the association already exists
	exists, err := sess.Collection("posts_tags").Find(db.Cond{"post_id": postID, "tag_id": tagID}).Exists()
	if err != nil {
		return err
	}

	if !exists {
		// If the association doesn't exist, create it
		_, err := sess.Collection("posts_tags").Insert(map[string]interface{}{
			"post_id": postID,
			"tag_id":  tagID,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

func getTagsForPost(postID int) ([]Tag, error) {
	sess := database.GetSession()
	var tags []Tag

	// Retrieve all tag IDs associated with the post
	var tagIDs []TagID // Correct use of a struct to match the expected result format
	err := sess.Collection("posts_tags").Find(db.Cond{"post_id": postID}).Select("tag_id").All(&tagIDs)
	if err != nil {
		fmt.Println("failed to get post_tags:", err)
		return nil, err
	}

	// Retrieve tag details for each tag ID
	for _, tagIDStruct := range tagIDs {
		var tag Tag
		// Correctly use the TagID field from the tagIDStruct in the condition
		err = sess.Collection("tags").Find(db.Cond{"id": tagIDStruct.TagID}).One(&tag)
		if err != nil {
			return nil, err
		}
		tags = append(tags, tag)
	}

	return tags, nil
}

func getTags() ([]Tag, error) {
	sess := database.GetSession()
	var tags []Tag

	err := sess.Collection("tags").Find().All(&tags)
	if err != nil {
		return nil, err
	}

	return tags, nil
}

func ConvertTagsToProtoTags(tags []Tag) []*blog.Tag {
	var protoTags []*blog.Tag
	for _, tag := range tags {
		protoTag := &blog.Tag{
			Id:   int32(tag.ID),
			Name: tag.Name,
		}
		protoTags = append(protoTags, protoTag)
	}
	return protoTags
}

func getPost(postID int) (*Post, []Tag, error) {
	sess := database.GetSession()
	var dbPost Post

	// Find the post by ID
	err := sess.Collection("posts").Find(db.Cond{"id": postID}).One(&dbPost)
	if err != nil {
		return nil, nil, err
	}

	// Fetch tags for the post
	tags, err := getTagsForPost(postID)
	if err != nil {
		return nil, nil, err
	}

	return &dbPost, tags, nil
}
