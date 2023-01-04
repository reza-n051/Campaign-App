import API from "./API";
export default async function inActiveKarzar({ id }) {
    try {
        await API.post(`/karzar/inactive/${id}`);
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}