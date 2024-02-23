package main

import (
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

	// Parse body
	var body map[string]string
	_ = json.Unmarshal([]byte(request.Body), &body)

	// Validate required fields
	if _, ok := body["name"]; !ok {
		return events.APIGatewayProxyResponse{
			Body:       `{"error":true,"message":"name is required"}`,
			StatusCode: 400,
		}, nil
	}

	// Insert into the contact table
	query := "INSERT INTO contact (name, email, phone, place, twitter, linkedin, bluesky, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
	stmt, err := db.Prepare(query)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 500,
		}, nil
	}
	defer stmt.Close()

	_, err = stmt.Exec(body["name"], body["email"], body["phone"], body["place"], body["twitter"], body["linkedin"], body["bluesky"], body["notes"])
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 500,
		}, nil
	}

	return events.APIGatewayProxyResponse{
		Body:       `{"success":true}`,
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
