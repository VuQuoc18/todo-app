import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import styled from '@emotion/styled';
import './App.css'
import InputContainer from './components/InputContainer';
import ListItems from './components/ListItems';
import Footer from './components/Footer';
import { Todo } from './schemas/TodoSchema';
import { useLocalStorageTodos } from './hooks/useLocalStorageTodos';

export const AppWrapper = styled.div`
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2), 0 25px 50px 0 rgba(0,0,0,.1);
    background: #fff;
`;

export const H1 = styled.h1`
  font-size: 80px;
  color: #b83f45;
  font-weight: 400;
`

function App() {
  const { todos, setTodos } = useLocalStorageTodos();
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    if (todos.length > 0)
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleCreate = () => {
    if (newTodoText.trim() !== '') {
      const todo: Todo = {
        id: Math.random().toString(),
        text: newTodoText.trim(),
        completed: false,
      };
      setTodos((prevTodos: Todo[]) => [...prevTodos, todo]);
      setNewTodoText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  const handleToggle = (id: string) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemove = (id: string) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.filter((todo: Todo) =>
        todo.id !== id
      )
    );
  };

  const handleRemoveCompletedTodos = () => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.filter((todo: Todo) =>
        !todo.completed
      )
    );
  };

  const handleEdit = (id: string, newText: string) => {
    if (newText.length === 0) {
      return;
    }
    setTodos((prevTodos) => prevTodos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <Router>
      <H1>todos</H1>
      <AppWrapper>
        <InputContainer todos={todos} newTodo={newTodoText} setTodos={setTodos} setNewTodo={setNewTodoText} handleKeyDown={handleKeyDown} />
        <ListItems todos={todos} handleRemove={handleRemove} handleToggle={handleToggle} handleEdit={handleEdit} />
        { todos.length > 0 && <Footer todos={todos} handleRemoveCompletedTodos={handleRemoveCompletedTodos}/> }
      </AppWrapper>
    </Router>
  )
}

export default App
