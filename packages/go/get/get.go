package main

import (
	"database/sql"
	"dex/backend/core"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayProxyResponse, error) {
	// Connect to Database
	db, err := core.GetDB()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 404,
		}, nil
	}
	defer db.Close()

	// Query DB
	id := request.PathParameters["id"]
	if id == "" {
		return events.APIGatewayProxyResponse{
			Body:       `{"error":true,"message":"Missing ID"}`,
			StatusCode: 404,
		}, nil
	}

	var c core.Contact
	row := db.QueryRow("SELECT * FROM contact WHERE id = ?", id)
	if err := row.Scan(&c.Id, &c.Name, &c.Email, &c.Phone, &c.Place, &c.Twitter, &c.LinkedIn, &c.BlueSky, &c.Notes); err != nil {
		if err == sql.ErrNoRows {
			return events.APIGatewayProxyResponse{
				Body:       `{"error":true,"message":"Contact not found"}`,
				StatusCode: 404,
			}, nil
		}
	}

	data, _ := json.Marshal(c)

	return events.APIGatewayProxyResponse{
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
