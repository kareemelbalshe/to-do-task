import axios from 'axios'

const request = axios.create({
    baseURL: "http://localhost:5000",
})
//https://to-do-task-1.onrender.com


export default request
