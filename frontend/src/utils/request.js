import axios from 'axios'

const request = axios.create({
    baseURL: "http://localhost:5000",
})
//https://blog-app-mern-fprg.onrender.com


export default request
