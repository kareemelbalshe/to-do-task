export default function TaskItem({
  task,
  updateStatus,
  taskDelete,
  setEditIdTask,
  setNewTextTask,
}) {
  return (
    <div className="task-item" key={task._id}>
      <p>{task.text}</p>
      <div className="status">
        <button
          style={{
            backgroundColor: task.status === "in future" ? "#14c4c4" : "",
          }}
          onClick={(e) => updateStatus(e, task._id, "in future")}
        >
          In future
        </button>
        <button
          style={{
            backgroundColor: task.status === "in progress" ? "yellow" : "",
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
  );
}
