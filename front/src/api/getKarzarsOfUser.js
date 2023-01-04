import API from "./API";
export default async function getKarzarsOfUser() {
    try {
        const res = await API.get(`/karzar/`);
        return res.data;
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}