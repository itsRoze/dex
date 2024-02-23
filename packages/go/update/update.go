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

	// Get ID
	id := request.PathParameters["id"]
	if id == "" {
		return events.APIGatewayProxyResponse{
			Body:       `{"error":true,"message":"Missing ID"}`,
			StatusCode: 404,
		}, nil
	}

	// Parse body
	var body map[string]string
	_ = json.Unmarshal([]byte(request.Body), &body)

	// Construct update query
	query := "UPDATE contact SET "
	var params []interface{}
	for key, value := range body {
		query += fmt.Sprintf("%s=?, ", key)
		params = append(params, value)
	}
	// Remove the trailing comma and space
	query = query[:len(query)-2]

	// Add WHERE clause
	query += " WHERE id = ?"
	params = append(params, id)

	// Execute the update query
	stmt, err := db.Prepare(query)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 500,
		}, nil
	}
	defer stmt.Close()

	_, err = stmt.Exec(params...)
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
