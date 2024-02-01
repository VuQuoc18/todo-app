import React from 'react';
import styled from '@emotion/styled';
import { Todo } from '../schemas/TodoSchema';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
  todos: Todo[];
  handleRemoveCompletedTodos: () => void;
}

export const FooterStyled = styled.div`
  display: flex;
  background: #fff;
  justify-content: space-between;
  border-top: 1px solid #e6e6e6;
  font-size: 15px;
  height: 20px;
  padding: 10px 15px;
  color: #000;
  position: relative;

  .link {
    position: relative;
    z-index: 1;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  &::before {
    bottom: 0;
    box-shadow: 0 1px 1px rgba(0,0,0,.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0,0,0,.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0,0,0,.2);
    content: "";
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
  }
`;

export const FilterStyled = styled.div`
  position: relative;
  z-index: 1;
  ul {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 5px;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      padding: 0 5px;
      a {
        font-weight: normal;
        color: #000;
      }

      &.active {
        border: 1px solid #ce4646;
        border-radius: 3px;
      }
    }
  }
`;

const TodoFooter: React.FC<FooterProps> = ({ todos, handleRemoveCompletedTodos }) => {
  const completedTodoCount = todos.filter(todo => !todo.completed).length;
  const location = useLocation();
  return (
    <FooterStyled>
      <span>{completedTodoCount} item{completedTodoCount > 1 && 's'} left!</span>
      <FilterStyled>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">All</Link>
            </li>
            <li className={location.pathname === '/active' ? 'active' : ''}>
              <Link to="/active">Active</Link>
            </li>
            <li className={location.pathname === '/completed' ? 'active' : ''}>
              <Link to="/completed">Completed</Link>
            </li>
          </ul>
        </nav>
      </FilterStyled>
      <span className='link' onClick={() => handleRemoveCompletedTodos()}>Clear completed</span>
    </FooterStyled>
  );
};

export default TodoFooter;
