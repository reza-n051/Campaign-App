import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom";
import editProfile from "../api/editProfile";
import getUser from "../api/getUser";
import FormFieldErrorMsg from "../components/FormFieldErrorMsg";
import FormFieldSuccessfulMsg from "../components/FormFieldSuccessfulMsg";
import * as Yup from 'yup';
import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import userAtom from "../jotaiAtoms/auth";
export default function EditProfilePage() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const [imgPathInServer, setImgPathInServer] = useState("");
    const { isError, isIdle, isLoading, error, data } = useQuery(['user', username], () => getUser(username), {
        enabled: !!username,
    });


    const { mutate } = useMutation(editProfile, {
        onSuccess: (data) => {
            toast.success("Edited Successfully !!");
            setUser({
                ...user, username: data.username
            });
            navigate("../");
        },
        onError: (error) => {
            toast.warn(error.message);
        }
    });

    const formik = useFormik({
        initialValues: {
            firstName: data ? data.firstName : "",
            lastName: data ? data.lastName : "",
            email: data ? data.email : "",
            password: data ? data.password : "",
            phoneNumber: data ? data.phoneNumber : ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required("email is required"),
            // email: Yup.string().email("please enter a valid email").required("email is required"),
            password: Yup.string().min(4, "password should be 4 character or much").required("password is required"),
            firstName: Yup.string().required("firstName is required"),
            lastName: Yup.string().required("lastName is required"),
            phoneNumber: Yup.string().min(11, "phoneNumber has 11 character").max(11, "phoneNumber has 11 character").required("required !")
                .matches("09[0-9]*", "invalid phone number")

        }), onSubmit: ({ email, firstName, lastName, password, phoneNumber }) => {
            mutate({ username, email, firstName, phoneNumber, lastName, password, imgPath: imgPathInServer });
        }
    });
    if (isError) {
        return (
            <div className="mt-4 w-64 h-24 border-red-500 border-2">
                <span>{error.message}</span>
            </div>
        )
    }
    if (isLoading || isIdle) {
        return (
            <div className="mt-4 w-64 h-24 border-yellow-400 border-2">
                <span className="loading">Loading ...</span>
            </div>
        )
    }

    return (
        <form className="mt-4 w-[calc(100%-20px)] sm:w-[calc(100%-100px)] mx-auto border-2 border-gray-300 p-4 flex flex-col" onSubmit={formik.handleSubmit}>
            <InputSection
                value={formik.values.firstName}
                onChange={formik.handleChange}
                id="firstName"
                title="First Name:"
                isTouched={!formik.touched.firstName}
                error={formik.errors.firstName}
                currentVal={data.firstName !== "" ? data.firstName : "Empty"}
            />
            <InputSection
                value={formik.values.lastName}
                onChange={formik.handleChange}
                id="lastName"
                title="Last Name:"
                isTouched={!formik.touched.lastName}
                error={formik.errors.lastName}
                currentVal={data.lastName !== "" ? data.lastName : "Empty"}
            />
            <InputSection
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                title="Email:"
                isTouched={!formik.touched.email}
                error={formik.errors.email}
                currentVal={data.email !== "" ? data.email : "Empty"}
            />
            <InputSection
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                title="Password:"
                isTouched={!formik.touched.password}
                error={formik.errors.password}
                currentVal={data.password !== "" ? data.password : "Empty"}
            />
            <InputSection
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                id="phoneNumber"
                title="phoneNumber:"
                isTouched={!formik.touched.phoneNumber}
                error={formik.errors.phoneNumber}
                currentVal={data.phoneNumber !== "" ? data.phoneNumber : "Empty"}
            />
            <ImageUploader setImgPathInServer={setImgPathInServer} />
            <button type="submit" className="btn  btn-outline btn-info mx-auto"><span>Submit</span></button>
        </form>
    )
}
function InputSection({ value, onChange, id, title, currentVal, isTouched, error }) {
    return (
        <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
            <span>{title}</span>
            <input
                placeholder={`cuurent value: ${currentVal}`}
                value={value}
                id={id}
                name={id}
                onChange={onChange}
                className="input input-info"
            />
            {
                isTouched && error ? (<FormFieldErrorMsg msg={error} />) : (<FormFieldSuccessfulMsg name={id} />)
            }
        </label>
    )
}
