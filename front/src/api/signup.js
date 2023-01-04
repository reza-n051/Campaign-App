import API from './API';
export default async function signup({ email, username, password, lastName, firstName, phoneNumber }) {
    try {
        const res = await API.post("/auth/signup", { email, username, password, lastName, firstName, phoneNumber });
        console.log(res)
        return res.data.user;
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}