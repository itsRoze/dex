package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/teamkeel/sst-go"
)

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayProxyResponse, error) {
	// Parse body
	var body map[string]string
	_ = json.Unmarshal([]byte(request.Body), &body)

	// Validate required fields
	if _, ok := body["password"]; !ok {
		return events.APIGatewayProxyResponse{
			Body:       `{"error":true,"message":"password is required"}`,
			StatusCode: 400,
		}, nil
	}

	appPass, err := sst.Secret(context.Background(), "APP_PASS")
	if err != nil {
		fmt.Printf("Error: %s\n", err)
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 500,
		}, nil
	}

	if body["password"] == appPass {
		return events.APIGatewayProxyResponse{
			Body:       `{"success":true}`,
			StatusCode: 200,
		}, nil
	}

	return events.APIGatewayProxyResponse{
		Body:       `{"error":true,"message":"Incorrect password"}`,
		StatusCode: 404,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
