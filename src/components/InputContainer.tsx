import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Todo } from '../schemas/TodoSchema';
import styled from '@emotion/styled';

export const InputContainerStyled = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 24px;

  input {
    font-size: 24px;
    line-height: 1.4em;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    width: 100%;
    background: #120722;
    color: #ccc;
    border: 1px solid #ccc;
    ::-ms-input-placeholder {
      font-style: italic;
    }

    ::placeholder {
      font-style: italic;
    }

    &:focus {
      outline: 1px solid #200648;
      box-shadow: 0 0 2px 2px #160122;
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
          <AiFillCaretDown size={25} color={ isAllCompleted ? '#b486f8' : '#fff'}/>
        </div> }
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task ..."
      />
    </InputContainerStyled>
  );
};

export default InputContainer;
