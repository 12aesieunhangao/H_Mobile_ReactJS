import { createContext } from "react";
import { ITask } from "./TaskInterFace";

 
//  bước 2: Tạo context
 export const TasksContext = createContext(null);
 export const TasksDispatchContext = createContext(null);
 
 
 export function tasksReducer(tasks: typeof initialTasks, action: { type: string; text?: string; task?: ITask }) {
  switch (action.type) {
    case 'add':
      return [...tasks, { id: tasks.length + 1, text: action.text || '', done: false }];
    case 'update':
      return tasks.map(task =>
        task.id === action.task?.id ? { ...task, ...action.task } : task
      );
    case 'delete':
      return tasks.filter(task => task.id !== action.task!.id);
    default:
      throw new Error('Unknown action type');
  }
}


export const initialTasks = [
  { id: 1, text: 'Task 1', done: false },
  { id: 2, text: 'Task 2', done: true },
  { id: 3, text: 'Task 3', done: false },
];


 