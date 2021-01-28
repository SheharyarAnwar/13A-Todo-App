/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AddTodoMutationVariables = {
  title: string,
};

export type AddTodoMutation = {
  addTodo:  {
    __typename: "Todo",
    userId: string,
    title: string,
    isCompleted: boolean,
    docId: string,
  },
};

export type MarkAsCompletedMutationVariables = {
  docId: string,
};

export type MarkAsCompletedMutation = {
  markAsCompleted:  {
    __typename: "Todo",
    userId: string,
    title: string,
    isCompleted: boolean,
    docId: string,
  },
};

export type TodosQuery = {
  todos:  Array< {
    __typename: "Todo",
    userId: string,
    title: string,
    isCompleted: boolean,
    docId: string,
  } | null >,
};
