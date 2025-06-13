import { useEffect, useReducer } from "react";
import ToDoList from './components/ToDoList';

const getInitialState = () => {
  try {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return[...state, {id: Date.now(), text: action.payload, completed: false, date: new Date().toLocaleString()}]
    case 'UPDATE':
      return state.map(task => task.id === action.payload.id ? { ...task, text: action.payload.text, date: new Date().toLocaleString() } : task);
    case 'DELETE':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE':
      return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task);
    default:
      return state;
  }
}

function App() {
  const[tasks, dispatch] = useReducer(reducer, [], getInitialState)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    const input = e.target.elements.task;
    if (input.value.trim()) {
      dispatch({ type: 'ADD', payload: input.value});
      input.value = '';
    }
  }
  return (
    <div className="container">
      <h1>To-do today</h1>
      <form onSubmit={handleAdd}>
        <input name="task" placeholder="Add a new task..." />
        <button type="submit">Add</button>
      </form>
      <ToDoList tasks={tasks} dispatch={dispatch} />
    </div>
  );
}

export default App;