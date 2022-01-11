import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import EditTodo from './EditTodo'
import ErrorPage from './ErrorPage'
import TagList from './TagList'
import EditTag from './EditTag'
import './App.css'

const NavBar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

function App() {
  return (
    <>
      <NavBar>
        <Logo>
          TODO
        </Logo>
        <NavItems>
          <NavItem>
            <Link to="/todos">Todos</Link>
          </NavItem>
          <NavItem>
            <Link to="/todos/new">Add New Todo</Link>
          </NavItem>
          <NavItem>
            <Link to="/tags">Tags</Link>
          </NavItem>
        </NavItems>
      </NavBar>
      <Wrapper>
        <Routes>
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/new" element={<AddTodo />} />
          <Route path="/todos/:id/edit" element={<EditTodo />} />
          <Route path="/tags" element={<TagList />} />
          <Route path="/tags/:id/edit" element={<EditTag />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Wrapper>
    </>
  )
}

export default App
