import React, { useState } from 'react';
import { useTimezone } from '../contexts/TimezoneContext';

interface Todo {
  id: number;
  text: string;
  createdAt: Date;
  dueDate: Date | null;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const { formatToET } = useTimezone();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [dueDateOption, setDueDateOption] = useState<string>('none');
  const [customDueDate, setCustomDueDate] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDueDateOption, setEditDueDateOption] = useState<string>('none');
  const [editCustomDueDate, setEditCustomDueDate] = useState<string>('');

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      let dueDate: Date | null = null;
      const now = new Date();
      
      if (dueDateOption === 'oneDay') {
        dueDate = new Date(now);
        dueDate.setDate(dueDate.getDate() + 1);
      } else if (dueDateOption === 'sevenDays') {
        dueDate = new Date(now);
        dueDate.setDate(dueDate.getDate() + 7);
      } else if (dueDateOption === 'custom' && customDueDate) {
        dueDate = new Date(customDueDate);
      }

      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        createdAt: now,
        dueDate: dueDate,
        completed: false
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputText('');
      setDueDateOption('none');
      setCustomDueDate('');
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    
    if (!todo.dueDate) {
      setEditDueDateOption('none');
      setEditCustomDueDate('');
    } else {
      setEditDueDateOption('custom');
      // Format date to YYYY-MM-DDThh:mm format for datetime-local input
      const isoString = todo.dueDate.toISOString();
      setEditCustomDueDate(isoString.substring(0, 16));
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
    setEditDueDateOption('none');
    setEditCustomDueDate('');
  };

  const saveEditing = (id: number) => {
    if (editText.trim() === '') return;

    setTodos(prevTodos => 
      prevTodos.map(todo => {
        if (todo.id === id) {
          let newDueDate: Date | null = null;
          
          if (editDueDateOption === 'oneDay') {
            newDueDate = new Date();
            newDueDate.setDate(newDueDate.getDate() + 1);
          } else if (editDueDateOption === 'sevenDays') {
            newDueDate = new Date();
            newDueDate.setDate(newDueDate.getDate() + 7);
          } else if (editDueDateOption === 'extend1Day' && todo.dueDate) {
            newDueDate = new Date(todo.dueDate);
            newDueDate.setDate(newDueDate.getDate() + 1);
          } else if (editDueDateOption === 'extend7Days' && todo.dueDate) {
            newDueDate = new Date(todo.dueDate);
            newDueDate.setDate(newDueDate.getDate() + 7);
          } else if (editDueDateOption === 'custom' && editCustomDueDate) {
            newDueDate = new Date(editCustomDueDate);
          }
          
          return {
            ...todo,
            text: editText,
            dueDate: newDueDate
          };
        }
        return todo;
      })
    );
    
    setEditingId(null);
    setEditText('');
    setEditDueDateOption('none');
    setEditCustomDueDate('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDueDateOption(e.target.value);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDueDate(e.target.value);
  };

  const handleEditDueDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditDueDateOption(e.target.value);
  };

  const handleEditCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCustomDueDate(e.target.value);
  };

  const getStatusClass = (todo: Todo) => {
    if (todo.completed) return 'completed';
    if (!todo.dueDate) return '';
    
    const now = new Date();
    return now > todo.dueDate ? 'overdue' : '';
  };

  return (
    <div className="todo-list">
      <h2>Todo App</h2>
      <p className="todo-subtitle">All times are displayed in Eastern Time (ET)</p>
      
      <div className="todo-form">
        <div className="todo-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a new task"
          />
        </div>
        
        <div className="todo-due-date">
          <select value={dueDateOption} onChange={handleDueDateChange}>
            <option value="none">No due date</option>
            <option value="oneDay">Due in 1 day</option>
            <option value="sevenDays">Due in 7 days</option>
            <option value="custom">Custom date</option>
          </select>
          
          {dueDateOption === 'custom' && (
            <input
              type="datetime-local"
              value={customDueDate}
              onChange={handleCustomDateChange}
            />
          )}
        </div>
        
        <button className="add-button" onClick={handleAddTodo}>Add Task</button>
      </div>
      
      {todos.length === 0 ? (
        <p className="no-todos">No tasks yet. Add your first task above!</p>
      ) : (
        <ul className="todos">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${getStatusClass(todo)}`}>
              {editingId === todo.id ? (
                <div className="todo-edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                  />
                  
                  <div className="edit-due-date">
                    <select value={editDueDateOption} onChange={handleEditDueDateChange}>
                      <option value="none">No due date</option>
                      <option value="oneDay">Due in 1 day</option>
                      <option value="sevenDays">Due in 7 days</option>
                      {todo.dueDate && <option value="extend1Day">Extend by 1 day</option>}
                      {todo.dueDate && <option value="extend7Days">Extend by 7 days</option>}
                      <option value="custom">Custom date</option>
                    </select>
                    
                    {editDueDateOption === 'custom' && (
                      <input
                        type="datetime-local"
                        value={editCustomDueDate}
                        onChange={handleEditCustomDateChange}
                      />
                    )}
                  </div>
                  
                  <div className="edit-buttons">
                    <button onClick={() => saveEditing(todo.id)} className="save-btn">Save</button>
                    <button onClick={cancelEditing} className="cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                  </div>
                  <div className="todo-meta">
                    <div>
                      <div className="todo-time">Created: {formatToET(todo.createdAt, 'yyyy-MM-dd HH:mm')}</div>
                      {todo.dueDate && (
                        <div className="todo-due">Due: {formatToET(todo.dueDate, 'yyyy-MM-dd HH:mm')}</div>
                      )}
                    </div>
                    <div className="todo-actions">
                      <button className="edit-btn" onClick={() => startEditing(todo)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      
      <div className="time-info">
        <p>Your local time: {new Date().toLocaleString()}</p>
        <p>All dates and times are displayed in Eastern Time (ET)</p>
      </div>
    </div>
  );
};

export default TodoList; 