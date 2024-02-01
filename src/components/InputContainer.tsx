import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Todo } from '../schemas/TodoSchema';
import styled from '@emotion/styled';

export const InputContainerStyled = styled.div`
  background: #fff;
  position: relative;
  display: flex;
  width: 100%;

  input {
    font-size: 24px;
    line-height: 1.4em;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    width: 100%;

    ::-ms-input-placeholder {
      font-style: italic;
    }

    ::placeholder {
      font-style: italic;
    }

    &:focus {
      outline: 1px solid #b83f45;
      box-shadow: 0 0 2px 2px #cf7d7d;
    }
  }

  .icon {
    position: absolute;
    left: 0;
    width: 60px;
    top: 30%;
  }
`;

interface InputContainerProps {
    todos: Todo[];
    newTodo: string;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setNewTodo: React.Dispatch<React.SetStateAction<string>>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({ todos, newTodo, setTodos, setNewTodo, handleKeyDown }) => {
  const isAllCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
    setTodos(updatedTodos);
  };

  return (
    <InputContainerStyled>
        { todos.length > 0 &&<div className="icon" onClick={handleToggleAll}>
          <AiFillCaretDown size={25} color={ isAllCompleted ? '#000' : '#ccc'}/>
        </div> }
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
      />
    </InputContainerStyled>
  );
};

export default InputContainer;
