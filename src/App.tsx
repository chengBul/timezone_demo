import React from 'react';
import './App.css';
import { TimezoneProvider } from './contexts/TimezoneContext';
import Clock from './components/Clock';
import DateConverter from './components/DateConverter';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <TimezoneProvider>
        <header className="App-header">
          <h1>Timezone Demo App</h1>
          <p>This app displays all times in Eastern Time (ET) regardless of your local timezone</p>
        </header>
        <main className="App-main">
          <Clock />
         
          <TodoList />
        </main>
        <footer className="App-footer">
          <p>Timezone Demo - All times displayed in Eastern Time (ET)</p>
        </footer>
      </TimezoneProvider>
    </div>
  );
}

export default App;
