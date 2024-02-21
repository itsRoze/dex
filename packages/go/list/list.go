package main

import (
	"database/sql"
	"dex/backend/core"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

type Contact struct {
	Id       int            `json:"id"`
	Name     sql.NullString `json:"name"`
	Email    sql.NullString `json:"email"`
	Phone    sql.NullString `json:"phone"`
	Place    sql.NullString `json:"place"`
	Twitter  sql.NullString `json:"twitter"`
	LinkedIn sql.NullString `json:"linkedin"`
	BlueSky  sql.NullString `json:"bluesky"`
	Notes    sql.NullString `json:"notes"`
}

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayProxyResponse, error) {
	db, err := core.GetDB()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       `{"error":true}`,
			StatusCode: 404,
		}, nil
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM contact")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
		return events.APIGatewayProxyResponse{
			Body:       `{"error":true}`,
			StatusCode: 404,
		}, nil
	}
	defer rows.Close()

	contacts := []Contact{}
	for rows.Next() {
		var c Contact
		err := rows.Scan(&c.Id, &c.Name, &c.Email, &c.Phone, &c.Place, &c.Twitter, &c.LinkedIn, &c.BlueSky, &c.Notes)
		if err != nil {
			fmt.Println("Error scanning row:", err)
			return events.APIGatewayProxyResponse{
				Body:       err.Error(),
				StatusCode: 500,
			}, nil
		}

		contacts = append(contacts, c)
	}

	data, _ := json.Marshal(contacts)

	return events.APIGatewayProxyResponse{
		Body:       "DB URL " + string(data),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
