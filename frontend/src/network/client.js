import axios from "axios";

const baseURL = 
    process.env.NODE_ENV === 'production' 
        ? 'api/memory' 
        : 'http://localhost:5000/api/memory/';
        
const axiosClient = axios.create({
    baseURL,
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    },
    withCredentials : true
});

export default axiosClient;