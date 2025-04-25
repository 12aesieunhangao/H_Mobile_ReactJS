// import { useReducer } from "react";
"use client";

import { initialTasks, tasksReducer } from "../untill/TaskReducer";
import AddTask from "../untill/AddTask";
import TaskList from "../untill/TaskList";
import { ITask } from "../untill/TaskInterFace";
import { useReducer } from "react";

export default function Home() {
    return (
     <TaskApp/>
    );
   }
   
   
   
   
   export function TaskApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
   
   
    return (
      <div >
        <h1>Tasks</h1>
        <AddTask onAddTask={(text:string) => {
          dispatch({ type: 'add', text });
        }} />
        <TaskList
          tasks={tasks}
          onChangeTask={(task:ITask) => {
            dispatch({ type: 'update', task });
          }}
          onDeleteTask={(task:ITask) => {
            dispatch({ type: 'delete', task });
          }}
        />
      </div>
    );
   }
   