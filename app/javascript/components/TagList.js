import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { AiFillEdit } from 'react-icons/ai'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px 0;
  font-size: 25px;
`

const TagName = styled.div`
  font-size: 27px;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/tags.json')
      .then(resp => {
        setTags(resp.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  return (
    <>
      <h1>TagList</h1>
      <div>
        {tags.map((val, key) => {
          return (
            <Row key={key}>
              <TagName>{val.name}</TagName>
              <Link to={"/tags/" + val.id + "/edit"}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          )
        })}
      </div>
    </>
  )
}

export default TagList;