import API from "./API";
export default async function acceptKarzar({ id }) {
    try {
        console.log(`lllllllllll is ${id}`)
        const res = await API.post(`/karzar/accept/${id}`);
        console.log(res)
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}