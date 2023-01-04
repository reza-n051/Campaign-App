import API from './API';
export default async function signup({ title, text, imgPath = "" }) {
    try {
        
        const res = await API.post("/karzar/", { title, text, imgPath });
        return res.data;
    } catch (err) {
        const msg = err.response.data.message
        throw new Error(msg);
    }
}