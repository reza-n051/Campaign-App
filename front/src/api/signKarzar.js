import { getToken, setToken } from '../utils/localStoarage';
import API from './API';
export default async function signKarzar({ id, firstName, lastName, phoneNumber }) {
    const token = getToken();
    if (token === "" || token === undefined || token === null) {
        try {
            console.log(phoneNumber)
            const res = await API.post(`/karzar-api/sign/${id}`, { firstName, lastName, phoneNumber });
            console.log(res)
            return res.data;
        } catch (error) {
            console.log(error)
            throw new Error("please try again !!!")
        }
    } else {
        try {
            const res = await API.post(`/karzar/sign/${id}`);
            return res.data;
        } catch (error) {
            throw new Error("please try again")
        }
    }
}