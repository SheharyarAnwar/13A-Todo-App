import { AppSyncResolverEvent, Context } from "aws-lambda"
import { DynamoDB } from "aws-sdk"
import {
  AddTodoParameters,
  MarkAsCompletedParameters,
  Todo,
} from "../../Interfaces"
// import { v4 } from "uuid";
class Todos {
  documentClient: DynamoDB.DocumentClient
  tableName: string
  constructor(tableName: string) {
    this.documentClient = new DynamoDB.DocumentClient()
    this.tableName = tableName
  }
  async addTodos(
    event: AppSyncResolverEvent<AddTodoParameters>,
    context: Context
  ) {
    console.log(event.identity?.username, "Now OKi")
    const res = await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { docId: context.awsRequestId },
        UpdateExpression:
          "SET userId = :userId, isCompleted = :isCompleted, title = :title",
        ExpressionAttributeValues: {
          ":userId": event?.identity?.username,
          ":isCompleted": false,
          ":title": event.arguments.title,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise()

    return res
  }
  async getAllTodos(event: AppSyncResolverEvent<any>, context: Context) {
    console.log(event.identity?.username, "Now OKi get all")
    const res = await this.documentClient
      .scan({
        TableName: this.tableName,
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": event.identity?.username },
      })
      .promise()
    //replace hard coded userId with context Id later
    return res
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
      .promise()
    return res
  }
}

export default Todos
