import React from 'react';
import Item from './Item';
import { Todo } from '../schemas/TodoSchema';
import { Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';

export const ListItemsStyled = styled.div`
  background: #120722;
  text-align: left;
`;

interface ListItemsProps {
  todos: Todo[];
  handleToggle: (id: string) => void;
  handleRemove: (id: string) => void;
  handleEdit: (id: string, newText: string) => void;
}

const ListItems: React.FC<ListItemsProps> = ({ todos, handleToggle, handleRemove, handleEdit }) => {
  const AllComponent = () => {
    return <>
      {todos.map((todo) => (
        <Item key={todo.id} todo={todo} handleToggle={handleToggle} handleRemove={handleRemove} handleEdit={handleEdit}/>
      ))}
    </>;
  };
  const ActiveComponent = () => {
    return <>
      {todos.filter((todo) => todo.completed === false).map((todo) => (
        <Item key={todo.id} todo={todo} handleToggle={handleToggle} handleRemove={handleRemove} handleEdit={handleEdit}/>
      ))}
    </>;
  };
  const CompletedComponent = () => {
    return <>
      {todos.filter((todo) => todo.completed === true).map((todo) => (
        <Item key={todo.id} todo={todo} handleToggle={handleToggle} handleRemove={handleRemove} handleEdit={handleEdit}/>
      ))}
    </>;
  };
  return (
    <ListItemsStyled>
      <Routes>
        <Route path="/" Component={AllComponent} />
        <Route path="/active" Component={ActiveComponent} />
        <Route path="/completed" Component={CompletedComponent} />
      </Routes>
    </ListItemsStyled>
  );
};

export default ListItems;
