import { AppSyncResolverEvent, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import {
  AddTodoParameters,
  MarkAsCompletedParameters,
  Todo,
} from "../../Interfaces";
// import { v4 } from "uuid";
class Todos {
  documentClient: DynamoDB.DocumentClient;
  tableName: string;
  constructor(tableName: string) {
    this.documentClient = new DynamoDB.DocumentClient();
    this.tableName = tableName;
  }
  async addTodos(
    event: AppSyncResolverEvent<AddTodoParameters>,
    context: Context
  ) {
    // const documentAttributes: Todo = {
    //   userId: "123456",
    //   docId: context.awsRequestId,
    //   isCompleted: false,
    //   title: event.arguments.title,
    // };

    const res = await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { docId: context.awsRequestId },
        UpdateExpression:
          "SET userId = :userId, isCompleted = :isCompleted, title = :title",
        ExpressionAttributeValues: {
          ":userId": "123123",
          ":isCompleted": false,
          ":title": event.arguments.title,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return res;
  }
  async getAllTodos(event: AppSyncResolverEvent<any>, context: Context) {
    const res = await this.documentClient
      .scan({
        TableName: this.tableName,
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": "123456" },
      })
      .promise();
    //replace hard coded userId with context Id later
    return res;
  }
  async markTodoAsCompleted(
    event: AppSyncResolverEvent<MarkAsCompletedParameters>,
    context: Context
  ) {
    const res = await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { docId: event.arguments.docId },
        UpdateExpression: "SET isCompleted = :isCompleted",
        ExpressionAttributeValues: {
          ":isCompleted": true,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return res;
  }
}

export default Todos;
