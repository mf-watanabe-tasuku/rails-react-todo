import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { ImCheckboxChecked, ImCheckboxUnchecked} from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'

const SearchAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

const TodoName = styled.div`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const TodoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 0 20px 0 10px;
`;

const TodoDeadline = styled.div`
  font-size: 16px;
  color: tomato;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 3px;
  line-height: 1;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px 0;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get('/api/v1/todos.json')
    .then(resp => {
      setTodos(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

  const getTodoDeadline = (date) => {
    if (!date) return;

    const deadline = new Date(date);
    const formattedDate = [
      deadline.getFullYear(),
      ('0' + (deadline.getMonth() + 1)).slice(-2),
      ('0' + (deadline.getDate())).slice(-2),
    ].join('/');

    return formattedDate;
  };

  const removeAllTodos = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('/api/v1/todos/destroy_all')
      .then(resp => {
        setTodos([]);
      })
      .catch(e => {
        console.log(e);
      })
    }
  }

  const updateIsCompleted = (index, val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
      deadline: val.deadline
    }
    axios.patch(`/api/v1/todos/${val.id}`, data)
    .then(resp => {
      const newTodos = [...todos];
      newTodos[index].is_completed = resp.data.is_completed;
      setTodos(newTodos);
    })
  }

  return (
    <>
      <h1>TodoList</h1>
      <SearchAndButton>
        <SearchForm
          type="text"
          placeholder='Search todo...'
          onChange={e => {
          setSearchName(e.target.value);
        }}/>
        <RemoveAllButton onClick={removeAllTodos}>
          Remove All
        </RemoveAllButton>
      </SearchAndButton>

      <div>
        {todos.filter((val) => {
          if (searchName === "") {
            return val;
          } else if (val.name.toLowerCase().includes  (searchName.toLowerCase())) {
            return val;
          }
        }).map((val, key) => {
          return (
            <Row key={key}>
              {val.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked
                    onClick={() => updateIsCompleted(key, val)}
                  />
                </CheckedBox>
              ) : (
                <UncheckedBox>
                  <ImCheckboxUnchecked
                    onClick={() => updateIsCompleted(key, val)}
                  />
                </UncheckedBox>
              )}
              <TodoContent>
                <TodoName is_completed={val.is_completed}>{val.name}</TodoName>
                {val.deadline && (
                  <TodoDeadline>
                    <MdOutlineWatchLater />
                    {getTodoDeadline(val.deadline)}
                  </TodoDeadline>
                )}
                {val.tags.length > 0 && val.tags.map(tag => tag.name)}
              </TodoContent>
              <Link to={"/todos/" + val.id + "/edit"}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          );
        })
        }
      </div>
    </>
  )
}

export default TodoList