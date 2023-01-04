import API from './API';
export default async function search(name, type) {

    const res = await API.post("/karzar-api/search", {
        name, type:"All"
    });
    return res.data;
}