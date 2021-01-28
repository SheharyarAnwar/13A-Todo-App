/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addTodo = /* GraphQL */ `
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      userId
      title
      isCompleted
      docId
    }
  }
`;
export const markAsCompleted = /* GraphQL */ `
  mutation MarkAsCompleted($docId: ID!) {
    markAsCompleted(docId: $docId) {
      userId
      title
      isCompleted
      docId
    }
  }
`;
