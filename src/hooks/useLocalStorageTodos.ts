import { useState, useEffect } from 'react';
import { Todo } from '../schemas/TodoSchema';

export const useLocalStorageTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        }
      } catch (error) {
        console.error('Parsing todos from local storage failed', error);
      }
    }
  }, []);

  return { todos, setTodos };
};
