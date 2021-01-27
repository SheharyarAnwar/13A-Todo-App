import { Context, AppSyncResolverEvent } from "aws-lambda";
import { TodosFieldName } from "../Interfaces";
import Todos from "./Services/Todo";
export async function handler(
  event: AppSyncResolverEvent<any>,
  context: Context
): Promise<any> {
  const todo = new Todos(process.env.TABLE || "");
  const fieldName: TodosFieldName = event.info.fieldName as TodosFieldName;
  switch (fieldName) {
    case "addTodo":
      const addTodoResults = await todo.addTodos(event, context);
      return addTodoResults.Attributes;
    case "todos":
      const getAllTodosResults = await todo.getAllTodos(event, context);
      return getAllTodosResults.Items;
    case "markAsCompleted":
      const markAsCompletedResults = await todo.markTodoAsCompleted(
        event,
        context
      );
      console.log(markAsCompletedResults);
      return markAsCompletedResults.Attributes;

    default:
      throw new Error("Something went wrong with supplied method");
  }
}
