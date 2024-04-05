package blog

import (
	"cards/gen/proto/blog"
	"context"
	"fmt"

	"github.com/bufbuild/connect-go"
)

type BlogService struct{}

func (s *BlogService) GetPost(ctx context.Context, req *connect.Request[blog.GetPostRequest]) (*connect.Response[blog.GetPostResponse], error) {
    // Call the new model function to fetch the post and its tags
    dbPost, tags, err := getPost(int(req.Msg.Id))
    if err != nil {
    	return nil, connect.NewError(connect.CodeInternal, err)
    }

    // Convert tags to protobuf format
    protoTags := ConvertTagsToProtoTags(tags)

    // Prepare the response
    post := &blog.Post{
        Id:      int32(dbPost.ID),
        Title:   dbPost.Title,
        Content: dbPost.Content,
        Author:  dbPost.Author,
        Tags:    protoTags,
    }

    return connect.NewResponse(&blog.GetPostResponse{Post: post}), nil
}


func (s *BlogService) CreatePost(ctx context.Context, req *connect.Request[blog.CreatePostRequest]) (*connect.Response[blog.CreatePostResponse], error) {
	p, err := createPost(req.Msg.Post)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	fmt.Println("p.Id: ", p.Id)
	for _, tagID := range req.Msg.TagIds {
		err := associateTagWithPost(int(p.Id), int(tagID))
		if err != nil {
			return nil, connect.NewError(connect.CodeInternal, err)
		}
	}

	return connect.NewResponse(&blog.CreatePostResponse{
		Post: p,
	}), nil
}

func (s *BlogService) GetPosts(ctx context.Context, req *connect.Request[blog.GetPostsRequest]) (*connect.Response[blog.GetPostsResponse], error) {
	var p *blog.Posts

	posts, err := getPosts(p)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&blog.GetPostsResponse{
		Posts: posts,
	}), nil
}

func (s *BlogService) CreateTag(ctx context.Context, req *connect.Request[blog.CreateTagRequest]) (*connect.Response[blog.CreateTagResponse], error) {
	tag, err := createTag(req.Msg.Name)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&blog.CreateTagResponse{
		Tag: &blog.Tag{
			Id:   int32(tag.ID),
			Name: tag.Name,
		},
	}), nil
}

func (s *BlogService) AssociateTagWithPost(ctx context.Context, req *connect.Request[blog.AssociateTagWithPostRequest]) (*connect.Response[blog.AssociateTagWithPostResponse], error) {
	err := associateTagWithPost(int(req.Msg.PostId), int(req.Msg.TagId))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&blog.AssociateTagWithPostResponse{
		Success: true,
	}), nil
}

func (s *BlogService) GetTags(ctx context.Context, req *connect.Request[blog.GetTagsRequest]) (*connect.Response[blog.GetTagsResponse], error) {
	tags, err := getTags()
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// Convert the slice of Tag models to a slice of protobuf Tag messages
	pbTags := make([]*blog.Tag, 0, len(tags))
	for _, tag := range tags {
		pbTags = append(pbTags, &blog.Tag{
			Id:   int32(tag.ID),
			Name: tag.Name,
		})
	}

	response := &blog.GetTagsResponse{
		Tags: pbTags,
	}

	// Wrap the response in a connect.Response
	return connect.NewResponse(response), nil
}

func (s *BlogService) GetTagsForPost(ctx context.Context, req *connect.Request[blog.GetTagsForPostRequest]) (*connect.Response[blog.GetTagsForPostResponse], error) {
	tags, err := getTagsForPost(int(req.Msg.PostId))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// Convert slice of Tag structs to slice of protobuf Tag messages
	var pbTags []*blog.Tag
	for _, tag := range tags {
		pbTags = append(pbTags, &blog.Tag{
			Id:   int32(tag.ID),
			Name: tag.Name,
		})
	}

	return connect.NewResponse(&blog.GetTagsForPostResponse{
		Tags: pbTags,
	}), nil
}
