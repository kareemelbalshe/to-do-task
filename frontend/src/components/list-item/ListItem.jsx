export default function ListItem({
  list,
  currentList,
  fetchTasks,
  setToggle,
  setEditId,
  setNewText,
  listDelete,
}) {
  return (
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
  );
}
