import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as appsync from "@aws-cdk/aws-appsync";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cognito from "@aws-cdk/aws-cognito";
export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userpool = new cognito.UserPool(this, "todoAppuserpool", {
      userPoolName: "todoAppSheharyar-userpool",
      selfSignUpEnabled: true,
      passwordPolicy: {
        minLength: 8,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
    });
    const poolClient = new cognito.UserPoolClient(
      this,
      "userPoolClient-Amplify",
      {
        userPool: userpool,
      }
    );

    const mainHandler = new lambda.Function(this, "MainTodoHandlerSheharyar", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
    });
    const graphEndPoint = new appsync.GraphqlApi(
      this,
      "GraphEndPointSheharyar",
      {
        name: "todo-app-sheharyar",
        schema: appsync.Schema.fromAsset("schema/index.gql"),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: userpool,
              defaultAction: appsync.UserPoolDefaultAction.ALLOW,
            },
          },
        },
        xrayEnabled: true,
      }
    );
    const table = new dynamodb.Table(this, "TableTodosSheharyar", {
      tableName: "todos",
      partitionKey: { name: "docId", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    table.grantFullAccess(mainHandler);
    mainHandler.addEnvironment("TABLE", table.tableName);
    const dataSource = graphEndPoint.addLambdaDataSource(
      "GraphDynamoDataSourceSheharyar",
      mainHandler
    );
    dataSource.createResolver({
      fieldName: "addTodo",
      typeName: "Mutation",
    });
    dataSource.createResolver({
      fieldName: "markAsCompleted",
      typeName: "Mutation",
    });
    dataSource.createResolver({
      fieldName: "todos",
      typeName: "Query",
    });
  }
}
