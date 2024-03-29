package main

import (
	"dex/backend/core"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayProxyResponse, error) {
	db, err := core.GetDB()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 404,
		}, nil
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM contact")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
			StatusCode: 404,
		}, nil
	}
	defer rows.Close()

	contacts := []core.Contact{}
	for rows.Next() {
		var c core.Contact
		err := rows.Scan(&c.Id, &c.Name, &c.Email, &c.Phone, &c.Place, &c.Twitter, &c.LinkedIn, &c.BlueSky, &c.Notes)
		if err != nil {
			fmt.Println("Error scanning row:", err)
			return events.APIGatewayProxyResponse{
				Body:       fmt.Sprintf(`{"error":true,"message":"%v"}`, err.Error()),
				StatusCode: 500,
			}, nil
		}

		contacts = append(contacts, c)
	}

	data, _ := json.Marshal(contacts)

	return events.APIGatewayProxyResponse{
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
