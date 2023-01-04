import API from './API';
export default async function getKarzar(id) {

    try {
        const res = await API.get(`/karzar-api/${id}`);
        console.log(res.data)
        return res.data.karzar
    } catch (error) {
        throw new Error("please try again ")
    }
}