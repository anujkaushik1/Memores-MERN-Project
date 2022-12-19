import axios from "axios";

const axiosClient = axios.create({
    baseURL : 'http://localhost:5000/api/memory/',
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

export default axiosClient;