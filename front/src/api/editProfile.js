import API from './API';
export default async function editProfile({ firstName, lastName, username, email, phoneNumber, password, imgPath = "" }) {
    try {
        const res = await API.put(`/users/${username}`, { email, imgPath, password, lastName, firstName, phoneNumber });
        console.log(res)
        return res.data;
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}