package core

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	"github.com/teamkeel/sst-go"
)

type Contact struct {
	Name     *string `json:"name"`
	Email    *string `json:"email"`
	Phone    *string `json:"phone"`
	Place    *string `json:"place"`
	Twitter  *string `json:"twitter"`
	LinkedIn *string `json:"linkedin"`
	BlueSky  *string `json:"bluesky"`
	Notes    *string `json:"notes"`
	Id       int     `json:"id"`
}

// GetDB returns the database connection
func GetDB() (*sql.DB, error) {
	url, err := sst.Secret(context.Background(), "TURSO_URL")
	if err != nil {
		fmt.Printf("Error: %s\n", err)
		return nil, err
	}

	token, err := sst.Secret(context.Background(), "TURSO_AUTH_TOKEN")
	if err != nil {
		fmt.Printf("Error: %s\n", err)
		return nil, err
	}

	dbUrl := fmt.Sprintf("%s?authToken=%s", url, token)
	db, err := sql.Open("libsql", dbUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open db %s: %s", url, err)
		os.Exit(1)
		return nil, err

	}

	return db, nil
}
