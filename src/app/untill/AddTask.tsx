import { useState } from "react";

export default function AddTask({ onAddTask }: { onAddTask: any }) {
  const [text, setText] = useState('');
  return (
    
      <div className="flex gap-2 mt-4">
  <input
    type="text"
    placeholder="Add task..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    onClick={() => {
      setText('');
      onAddTask(text);
    }}
    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
  >
    Add
  </button>
</div>

  )
 }
 