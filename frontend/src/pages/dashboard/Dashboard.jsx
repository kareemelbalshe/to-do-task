/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./dashboard.css";
import { useDashboardLogic } from "./DashboardLogic";
import TaskItem from "../../components/task-item/TaskItem";
import ListItem from "../../components/list-item/ListItem";

export default function Dashboard() {
  const {
    toggle,
    setToggle,
    currentList,
    text,
    setText,
    textTask,
    setTextTask,
    newText,
    setNewText,
    newTextTask,
    setNewTextTask,
    editId,
    setEditId,
    editIdTask,
    setEditIdTask,
    lists,
    tasks,
    formSubmitHandler,
    editSubmitHandler,
    listDelete,
    fetchTasks,
    formSubmitHandlerTask,
    editSubmitHandlerTask,
    updateStatus,
    taskDelete,
  } = useDashboardLogic();

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
            <ListItem
              list={list}
              currentList={currentList}
              fetchTasks={fetchTasks}
              setToggle={setToggle}
              setEditId={setEditId}
              setNewText={setNewText}
              listDelete={listDelete}
            />
          ))}
        </div>
      </div>
      {!currentList ? (
        <div className="right1">
          <img src={"/assets/images/task-list.png"} alt="img" />
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
                <TaskItem
                  task={task}
                  updateStatus={updateStatus}
                  taskDelete={taskDelete}
                  setEditIdTask={setEditIdTask}
                  setNewTextTask={setNewTextTask}
                />
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
