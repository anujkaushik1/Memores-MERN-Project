import axios from "axios";

const baseURL = 'http://3.83.243.112/api/memory'
const axiosClient = axios.create({
    baseURL,
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    },
    withCredentials : true
});

export default axiosClient;