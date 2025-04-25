import { useState } from "react";
import {ITask} from "./TaskInterFace";
// import { useState } from "react";
export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
 } :{
    tasks: ITask[];
    onChangeTask: any;
    onDeleteTask: any;
 }) {
  return (
    <ul className="mt-6 space-y-4">
  {tasks.map(task => (
    <li key={task.id} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
      <Task
        task={task}
        onChange={onChangeTask}
        onDelete={onDeleteTask}
      />
    </li>
  ))}
</ul>

  );
 }
 
 
 function Task({ task, onChange, onDelete }: {
    task: {
        id: number;
        text: string;
        done: boolean;
    };
    onChange: any;
    onDelete: any;
 }
 ) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <div className="flex items-center justify-between w-full">
      <span className="text-gray-800 text-lg">{task.text}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="ml-4 px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
      >
        Edit
      </button>
    </div>
    
    );
  }
  return (
    <div className="flex items-center justify-between w-full">
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={task.done}
      onChange={e => {
        onChange({
          ...task,
          done: e.target.checked
        });
      }}
      className="w-5 h-5 accent-green-500"
    />
    <div className={`${task.done ? "line-through text-gray-400" : "text-gray-800"} text-base`}>
      {taskContent}
    </div>
  </div>
  <button
    onClick={() => onDelete(task)}
    className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
  >
    Delete
  </button>
</div>

  );
 }
 