import API from './API';
export default async function getUser(username) {
    try {
        const res = await API.get(`/users/${username}`);
        console.log(res)
        return res.data;
    } catch (err) {
        console.log(err)
        const msg = err.response.data.statusText
        throw new Error(msg);
    }
    return {
        username: "",
        firstName: "r",
        lastName: "",
        email: "",
        password: "",
        img: ""
    };
}