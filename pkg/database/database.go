package database

import (
	"log"

	"github.com/upper/db/v4"
	"github.com/upper/db/v4/adapter/sqlite"
)

var sess db.Session

func InitDB() {
	var err error
	var settings = sqlite.ConnectionURL{
		Database: `mydatabase.db`, // Your SQLite database file
	}

	// Open a session to your SQLite database
	sess, err = sqlite.Open(settings)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Create tables
	createPostsTable()
	createUsersTable()
	createTagsTable()
	createPostsTagsTable()
}

func createPostsTable() {
	sqlCommand := `
	CREATE TABLE IF NOT EXISTS posts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		author TEXT NOT NULL
	);`

	_, err := sess.SQL().Exec(sqlCommand)
	if err != nil {
		log.Fatalf("Failed to create Posts table: %v", err)
	} else {
		log.Println("Posts table created successfully")
	}
}

// New function to create the Users table
func createUsersTable() {
	sqlCommand := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL UNIQUE,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`

	_, err := sess.SQL().Exec(sqlCommand)
	if err != nil {
		log.Fatalf("Failed to create Users table: %v", err)
	} else {
		log.Println("Users table created successfully")
	}
}

func createTagsTable() {
	sqlCommand := `
	CREATE TABLE IF NOT EXISTS tags (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL UNIQUE
	);`

	_, err := sess.SQL().Exec(sqlCommand)
	if err != nil {
		log.Fatalf("Failed to create Tags table: %v", err)
	} else {
		log.Println("Tags table created successfully")
	}
}

func createPostsTagsTable() {
	sqlCommand := `
	CREATE TABLE IF NOT EXISTS posts_tags (
		post_id INTEGER NOT NULL,
		tag_id INTEGER NOT NULL,
		FOREIGN KEY(post_id) REFERENCES posts(id),
		FOREIGN KEY(tag_id) REFERENCES tags(id),
		PRIMARY KEY(post_id, tag_id)
	);`

	_, err := sess.SQL().Exec(sqlCommand)
	if err != nil {
		log.Fatalf("Failed to create PostsTags join table: %v", err)
	} else {
		log.Println("PostsTags join table created successfully")
	}
}


func GetSession() db.Session {
	return sess
}
