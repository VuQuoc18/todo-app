import React, { useState } from 'react';
import { Todo } from '../schemas/TodoSchema';
import { LiaTimesSolid } from 'react-icons/lia';
import styled from '@emotion/styled';

export const ItemStyled = styled.div<{ completed: boolean, isEditing: boolean }>`
  position: relative;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  color: ${(props) => (props.completed ? 'gray' : '#fff')};
  padding: 15px 15px 15px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin-bottom: 24px;

  border: 2px solid ${(props) => (props.isEditing ? '#e6e6e6' : '#6015d0')};
  box-shadow: ${(props) => (props.isEditing ? '0 0 2px 2px #e6e6e6' : 'none')};

  &:hover {
    background: #200648;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .item {
    display: flex;
    width: 100%;

    &__radio {
      position: absolute;
      left: 10px;

      input {
        visibility: ${(props) => (props.completed ? 'visible' : 'hidden')};

        &:checked + .item__label .item__label__checkbox {
          background-color: #fff;
          border-color: ${(props) => (props.completed ? '#66bb6a' : '#ccc')};

          &:after {
            opacity: ${(props) => (props.completed ? '1' : '0')};
          }
        }
      }

      .item__label {
        position: relative;
        
        &__checkbox {
          background-color: #fff;
          border: 1px solid ${(props) => (props.completed ? '#66bb6a' : '#ccc')};
          border-radius: 50%;
          cursor: pointer;
          height: 28px;
          left: 0;
          position: absolute;
          top: 0;
          width: 28px;
    
          &:after {
            border: 2px solid #fff;
            border-top: none;
            border-right: none;
            content: "";
            height: 6px;
            left: 7px;
            opacity: ${(props) => (props.completed ? '1' : '0')};
            border-color: ${(props) => (props.completed ? '#66bb6a' : 'unset')};
            position: absolute;
            top: 8px;
            transform: rotate(-45deg);
            width: 12px;
          }
        }
      }
    }

    &__text {
      width: 100%;
      display: flex;
      justify-content: space-between;

      &__show {
        width: 100%;
        word-break: break-all;
      }
    }

    &__btn__remove {
      display: none;
      align-items: center;

      &:hover {
        cursor: pointer;
        color: #b83f45;
      }
    }

    &__edit {
      width: 100%;

      input {
        font-size: 20px;
        padding: 7px 0;
        border: none;
        width: 100%;
        background: #200648;
        color: #fff;

        &:focus {
          outline: none;
        }
      }
    }

    &:hover {
      .item__text {
        .item__btn__remove {
          display: flex;
        }
      }
    }
  }
`;

interface TodoItemProps {
  todo: Todo;
  handleToggle: (id: string) => void;
  handleRemove: (id: string) => void;
  handleEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, handleToggle, handleRemove, handleEdit }) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const handleBlur = () => {
    setIsOnEdit(false);
  };

  const handleKeyDownToEdit = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (e.key === 'Enter') {
      handleEdit(todoId, (e.target as HTMLInputElement).value);
    }
  };

  return (
    <ItemStyled completed={todo.completed} isEditing={isOnEdit}>
      {
        !isOnEdit ? 
          <div className='item'>
            <div className="item__radio">
              <div className='item__label'>
                <input type="checkbox" name={`checkDone_${todo.id}`} id={`checkDone_${todo.id}`} onClick={() => handleToggle(todo.id)} defaultChecked={todo.completed ? true : false} />
                <label htmlFor={`checkDone_${todo.id}`} className='item__label__checkbox'></label>
              </div>
            </div>
            <div className="item__text">
              <div className='item__text__show' onDoubleClick={() => setIsOnEdit(true)}>{todo.text}</div>
              <div className="item__btn__remove" onClick={() => handleRemove(todo.id)}>
                <LiaTimesSolid size={15} />
              </div>
            </div>
          </div> :
          <div className='item__edit'>
            <input
              type="text"
              defaultValue={todo.text}
              onKeyDown={(e) => handleKeyDownToEdit(e, todo.id)}
              onBlur={handleBlur}
              autoFocus
            />
          </div>
      }
    </ItemStyled>
  );
};

export default TodoItem;
