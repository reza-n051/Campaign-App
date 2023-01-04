import API from './API';
export default async function login({ username, password }) {
    try {
        const res = await API.post("/auth/login", { username, password });
        return res.data.user;
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}