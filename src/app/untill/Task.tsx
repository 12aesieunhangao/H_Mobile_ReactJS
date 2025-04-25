// until/Task.tsx
'use client';
import { useState } from 'react';
import { ITask } from './TaskInterFace';

export default function Task({
  task,
  onChange,
  onDelete
}: {
  task: ITask;
  onChange: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}) {
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
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task)}>Delete</button>
    </label>
  );
}
