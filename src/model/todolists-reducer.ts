import type { FilterValues, Todolist } from "../app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ id: string }>(
  "todoLists/deleteTodolist"
);
export const changeTodolistTitleAC = createAction<{
  id: string;
  title: string;
}>("todoLists/changeTodolist");
export const changeTodolistFilterAC = createAction<{
  id: string;
  filter: FilterValues;
}>("todoLists/changeTodolistFilter");
export const createTodolistAC = createAction(
  "todoLists/create_todolist",
  (title: string) => {
    return { payload: { title, id: nanoid() } };
  }
);

const initialState: Todolist[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      });
    });
});
