import API from "./API";
export default async function activeKarzar({ id }) {
    try {
        await API.post(`/karzar/active/${id}`);
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}