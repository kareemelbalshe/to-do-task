/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createList,
  getList,
  updateList,
  deleteList,
} from "../../redux/api/listApi";
import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../../redux/api/taskApi";
import img from "../../images/task-list.png";
import "./dashboard.css";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => {
        if (window.innerWidth > 768) {
          setToggle(true);
        } else {
          setToggle(false);
        }
      };
  
      checkScreenSize();
  
      window.addEventListener("resize", checkScreenSize);
  
      return () => {
        window.removeEventListener("resize", checkScreenSize);
      };
    }, []);

  const [currentList, setCurrentList] = useState(null);
  const [text, setText] = useState("");
  const [textTask, setTextTask] = useState("");
  const [newText, setNewText] = useState("");
  const [newTextTask, setNewTextTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editIdTask, setEditIdTask] = useState(null);
  const { lists } = useSelector((state) => state.list);
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("List name is required");
    try {
      await dispatch(createList({ title: text }));
      setText("");
      toast.success("List created successfully");
      await dispatch(getList());
    } catch (error) {
      toast.error("Error creating the list:", error);
    }
  };

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    if (newText.trim() === "") return toast.error("List name is required");
    try {
      await dispatch(updateList({ title: newText }, editId));
      setNewText("");
      setEditId(null);
      toast.success("List updated successfully");
      await dispatch(getList());
    } catch (error) {
      toast.error("Error updating the list:", error);
    }
  };

  const listDelete = async (id) => {
    try {
      await dispatch(deleteList(id));
      toast.success("List deleted successfully");
      await dispatch(getList());
    } catch (error) {
      toast.error("Error deleting the list:", error);
    }
  };

  const fetchTasks = async (id) => {
    setCurrentList(id);
    try {
      await dispatch(getTask(id));
    } catch (error) {
      toast.error("Error fetching the list:", error);
    }
  };

  const formSubmitHandlerTask = async (e, id) => {
    e.preventDefault();
    if (textTask.trim() === "") return toast.error("Task name is required");
    try {
      await dispatch(
        createTask({ text: textTask, status: "in future", listId: id })
      );
      setTextTask("");
      toast.success("Task created successfully");
      await dispatch(getTask(currentList));
    } catch (error) {
      toast.error("Error creating the task:", error);
    }
  };

  const editSubmitHandlerTask = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTask({ text: newTextTask }, editIdTask));
      setNewText("");
      setEditIdTask(null);
      toast.success("Task updated successfully");
      await dispatch(getTask(currentList));
    } catch (error) {
      toast.error("Error updating the task:", error);
    }
  };
  const updateStatus = async (e, id, status) => {
    e.preventDefault();
    try {
      await dispatch(updateTask({ status }, id));
      console.log(status);
      await dispatch(getTask(currentList));
    } catch (error) {
      toast.error("Error updating the task:", error);
    }
  };

  const taskDelete = async (id) => {
    try {
      await dispatch(deleteTask(id));
      toast.success("Task deleted successfully");
      await dispatch(getTask(currentList));
    } catch (error) {
      toast.error("Error deleting the task:", error);
    }
  };

  return (
    <div className="dashboard">
      <div onClick={() => setToggle((prev) => !prev)} className="Menu">
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>{" "}
      {editId && (
        <form className="edit-form" onSubmit={editSubmitHandler}>
          <input
            type="text"
            placeholder="Edit list name"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditId(null)}>Cancel</button>{" "}
        </form>
      )}
      {editIdTask && (
        <form className="edit-form" onSubmit={editSubmitHandlerTask}>
          <input
            type="text"
            placeholder="Edit task name"
            value={newTextTask}
            onChange={(e) => setNewTextTask(e.target.value)}
          />
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditIdTask(null)}>Cancel</button>
        </form>
      )}
      <div
        className="left"
        style={{
          left: toggle ? "0" : "-100%",
          display: toggle ? "block" : "none",
        }}
      >
        <h1>Dashboard</h1>
        <p>Create list of tasks</p>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            id="title"
            placeholder="Enter list name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>

        <div className="list">
          {lists.map((list) => (
            <div className="list-item" key={list._id}>
              <h3
                style={{
                  backgroundColor: currentList === list._id ? "#464646" : "",
                }}
                onClick={() => {
                  fetchTasks(list._id);
                  setToggle(false);
                }}
              >
                {list.title}
              </h3>
              <button
                onClick={() => {
                  setEditId(list._id);
                  setNewText(list.title);
                }}
              >
                Edit
              </button>
              <button onClick={() => listDelete(list._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {!currentList ? (
        <div className="right1">
          <img src={img} alt="img" />
          <h2>Add List</h2>
          <h3>and start your tasks</h3>
        </div>
      ) : (
        <div className="right2">
          <h2>Add Task</h2>
          <form onSubmit={(e) => formSubmitHandlerTask(e, currentList)}>
            <input
              type="text"
              id="title"
              placeholder="Enter task name"
              value={textTask}
              onChange={(e) => setTextTask(e.target.value)}
            />
            <button type="submit">Create</button>
          </form>
          {tasks.length > 0 ? (
            <div className="task">
              {tasks.map((task) => (
                <div className="task-item" key={task._id}>
                  <p>{task.text}</p>
                  <div className="status">
                    <button
                      style={{
                        backgroundColor:
                          task.status === "in future" ? "#14c4c4" : "",
                      }}
                      onClick={(e) => updateStatus(e, task._id, "in future")}
                    >
                      In future
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          task.status === "in progress" ? "yellow" : "",
                      }}
                      onClick={(e) => updateStatus(e, task._id, "in progress")}
                    >
                      In progress
                    </button>
                    <button
                      style={{
                        backgroundColor: task.status === "Done" ? "green" : "",
                      }}
                      onClick={(e) => updateStatus(e, task._id, "Done")}
                    >
                      Done
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setEditIdTask(task._id);
                      setNewTextTask(task.text);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => taskDelete(task._id)}>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ marginTop: "20px" }}>No tasks yet</p>
          )}
        </div>
      )}
    </div>
  );
}
