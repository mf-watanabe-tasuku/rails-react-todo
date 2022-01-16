import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoDataCase = styled.div`
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
`;

const CurrentStatus = styled.div`
  margin: 8px 0 12px;
  font-weight: bold;
`;

const InputForDeadline = styled.input`
  cursor: pointer;
  max-width: 300px;
  font-size: 16px;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const SelectForTag = styled.select`
  cursor: pointer;
  display: block;
  width: 100%;
  max-width: 300px;
  font-size: 16px;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const OptionForTag = styled.option`

`

const IsCompletedButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border-radius: 3px;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

toast.configure();

function EditTodo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false,
    deadline: "",
    tags: [],
  };

  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [tags, setTags] = useState([]);

  const notify = () => {
    toast.success("Todo successfully update!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const getTodo = () => {
    axios
      .get(`/api/v1/todos/${id}`)
      .then((resp) => {
        setCurrentTodo(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTags = () => {
    axios
      .get(`/api/v1/tags/`)
      .then(resp => {
        setTags(resp.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    getTodo(id);
    getTags();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateIsCompleted = (val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
      deadline: val.deadline,
    };

    axios
      .patch(`/api/v1/todos/${val.id}`, data).then((resp) => {
        setCurrentTodo(resp.data);
      });
  };

  const updateTodo = () => {
    axios
      .patch(`/api/v1/todos/${currentTodo.id}`, {
        todo: {
          id: currentTodo.id,
          name: currentTodo.name,
          is_completed: currentTodo.is_completed,
          deadline: currentTodo.deadline,
          tag_ids: currentTodo.tags,
        },
      })
      .then((resp) => {
        notify();
        navigate("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    const sure = confirm("Are you sure?");
    if (sure) {
      axios
        .delete(`/api/v1/todos/${currentTodo.id}`)
        .then((resp) => {
          console.log(resp.data);
          navigate("/todos");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <h1>Editing Todo</h1>
      <div>
        <TodoDataCase>
          <Row>
            <LabelCase>
              <label htmlFor="name">Current Name</label>
            </LabelCase>
            <InputForName
              type="text"
              id="name"
              name="name"
              value={currentTodo.name}
              onChange={handleInputChange}
            />
          </Row>
          <Row>
            <LabelCase>
              <span>CurrentStatus</span>
            </LabelCase>
            <CurrentStatus>
              {currentTodo.is_completed ? "Completed" : "UnCompleted"}
            </CurrentStatus>
          </Row>
          <Row>
            <LabelCase>
              <label htmlFor="deadline">Deadline</label>
            </LabelCase>
            <InputForDeadline
              type="date"
              id="deadline"
              name="deadline"
              value={currentTodo.deadline}
              onChange={handleInputChange}
            />
          </Row>
          <Row>
            <LabelCase>
              <label htmlFor="tag">tag</label>
            </LabelCase>
            <SelectForTag
              type="select"
              id="tag"
              name="tag_id"
              value={currentTodo.tags.length > 0 && currentTodo.tags[0].id}
              onChange={handleInputChange}
            >
              <OptionForTag>----</OptionForTag>
              {tags.map((tag, i) => {
                return (
                  <OptionForTag key={i} value={tag.id}>
                    {tag.name}
                  </OptionForTag>
                );
              })}
            </SelectForTag>
          </Row>
        </TodoDataCase>

        {currentTodo.is_completed ? (
          <IsCompletedButton onClick={() => updateIsCompleted(currentTodo)}>
            UnCompleted
          </IsCompletedButton>
        ) : (
          <IsCompletedButton onClick={() => updateIsCompleted(currentTodo)}>
            Completed
          </IsCompletedButton>
        )}
        <UpdateButton type="submit" onClick={updateTodo}>
          Update
        </UpdateButton>
        <DeleteButton onClick={deleteTodo}>Delete</DeleteButton>
      </div>
    </>
  );
}

export default EditTodo;
