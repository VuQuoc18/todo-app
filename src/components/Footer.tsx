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
  background: #120722;
  justify-content: space-between;
  border-top: 1px solid #e6e6e6;
  font-size: 15px;
  height: 20px;
  padding: 24px 15px;
  color: #fff;
  position: relative;
  font-weight: bold;

  .link {
    position: relative;
    z-index: 1;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
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
        color: #fff;
        font-weight: bold;
      }

      &.active {
        border: 1px solid #b486f8;
        border-radius: 3px;
        color: #b486f8;
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
