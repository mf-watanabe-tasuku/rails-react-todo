import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TagDataCase = styled.div`
  margin-bottom: 30px;
`

const Row = styled.div`
  margin-bottom: 20px;
`

const LabelCase = styled.div`
  font-size: 14px;
`

const InputForName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`

const UpdateButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  margin: 0 10px 0 0;
  background: #0ac620;
  border-radius: 3px;
  border: none;
  cursor: pointer;
`

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

toast.configure();

function EditTag() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialTagState = {
    id: null,
    name: '',
  }

  const [currentTag, setCurrentTag] = useState(initialTagState);

  const notify = () => {
    toast.success("Tag successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true
    })
  }

  const getTag = () => {
    axios
      .get(`/api/v1/tags/${id}`)
      .then(resp => {
        setCurrentTag(resp.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    getTag();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTag({ ...currentTag, [name]: value });
  }

  const updateTag = () => {
    axios
      .patch(`/api/v1/tags/${currentTag.id}`, currentTag)
      .then(resp => {
        notify();
        navigate('/tags');
      })
      .catch(e => {
        console.log(e);
      })
  }

  const deleteTag = () => {
    const sure = confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/v1/tags/${currentTag.id}`)
        .then(resp => {
          console.log(resp.data);
          navigate('/tags');
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  return (
    <>
      <h1>Editing Tag</h1>
      <div>
        <TagDataCase>
          <Row>
            <LabelCase>
              <label htmlFor="name">Current Name</label>
            </LabelCase>
            <InputForName
              type="text"
              id="name"
              name="name"
              value={currentTag.name}
              onChange={handleInputChange}
            />
          </Row>
          <UpdateButton type="submit" onClick={updateTag}>
            Update
          </UpdateButton>
          <DeleteButton onClick={deleteTag}>
            Delete
          </DeleteButton>
        </TagDataCase>
      </div>
    </>
  )
}

export default EditTag;
