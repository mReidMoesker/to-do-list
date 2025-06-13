import React, { useState } from 'react';
import '../css/index.css';

function TaskItem({ task, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleUpdate = () => {
    if (text.trim()) {
      dispatch({ type: 'UPDATE', payload: { id: task.id, text } });
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <span className="task-date">{task.date}</span>
          <div className="actions">
            <button onClick={() => dispatch({ type: 'TOGGLE', payload: task.id })}>✅</button>
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => dispatch({ type: 'DELETE', payload: task.id })}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;