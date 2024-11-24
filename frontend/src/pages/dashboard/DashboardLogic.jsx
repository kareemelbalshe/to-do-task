import { useEffect, useState } from "react";
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

export const useDashboardLogic = () => {
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

  return {
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
  };
};