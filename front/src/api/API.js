import axios from 'axios';
import { getToken } from '../utils/localStoarage';
const token = getToken() === undefined || getToken() === null || getToken() === "" ? "" : `Bearer ${getToken()}`;

const API = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Authorization": token
    }
});

export default API;