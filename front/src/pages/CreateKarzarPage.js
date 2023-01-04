import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createKarzar from "../api/createKarzar"
import ImageUploader from "../components/ImageUploader";
// import

export default function CreateKarzarPage() {
    const [imgPathInServer, setImgPathInServer] = useState('');
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: "",
            text: "",
        }, onSubmit: values => {
            const { title, text } = values;
            mutate({ title, text, imgPath: imgPathInServer });
        }
    });
    const { mutate } = useMutation(createKarzar, {
        onSuccess: () => {
            toast.success("Karzar created successfully !!");
            navigate("../");
        }, onError: (error) => {
            toast.warn(error.message);
        }
    });

    return (
        <form className="pt-8 px-2 w-[calc(100%-20px)] sm:w-[calc(100%-100px)] mx-auto flex flex-col space-y-4" onSubmit={formik.handleSubmit}>
            <label className="flex flex-col">
                <span className="mb-2">Name of Karzar:</span>
                <input
                    name="title"
                    id="title"
                    className="input input-info input-sm"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
            </label>
            <label className="flex flex-col">
                <span className="mb-2">Text of Karzar:</span>
                <textarea
                    name="text"
                    id="text"
                    className="w-[calc(100%-10px)] mx-auto h-96 border-red-400 hover:border-red-600 border-2 p-2"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                />
            </label>
            <ImageUploader setImgPathInServer={setImgPathInServer} />
            <button type="submit" className="btn btn-outline btn-info mx-auto">Create</button>
        </form>
    )
}