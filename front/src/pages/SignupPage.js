import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation } from "react-query";
import * as Yup from 'yup';
import FormFieldErrorMsg from "../components/FormFieldErrorMsg";
import FormFieldSuccessfulMsg from "../components/FormFieldSuccessfulMsg";
import signup from "../api/signup";
import userAtom from "../jotaiAtoms/auth";
import { useAtom } from "jotai";
import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import { setToken } from "../utils/localStoarage";
export default function SignupPage() {
    const [user, setUser] = useAtom(userAtom);
    const [isAgree, setIsAgree] = useState(false);
    const navigate = useNavigate();
    const { mutate } = useMutation(signup, {
        onSuccess: (data) => {
            const userData = data;
            setUser({ ...user, username: userData.username, isLogin: true });
            setToken(userData.token);
            navigate(`../profile/${userData.username}`);
        }, onError: (error) => {
            toast.warn(error.message)
        }
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            phoneNumber: "",
            firstName: "",
            lastName: "",
        }, validationSchema: Yup.object({
            email: Yup.string().required("email is required"),
            // email: Yup.string().email("please enter a valid email").required("email is required"),
            username: Yup.string().min(4, "username should be 4 character or much").required("username is required"),
            password: Yup.string().min(4, "password should be 4 character or much").required("password is required"),
            firstName: Yup.string().required("firstName is required"),
            lastName: Yup.string().required("lastName is required"),
            phoneNumber: Yup.string().min(11, "phoneNumber has 11 character").max(11, "phoneNumber has 11 character").required("required !")
                .matches("09[0-9]*", "invalid phone number")
        }), onSubmit: values => {
            const { email, password, username, firstName, lastName, phoneNumber } = values;
            mutate({ email, password, username, firstName, lastName, phoneNumber });
        }
    });
    return (
        <form className="my-16 w-4/5 md:w-3/5 lg:w-2/5 mx-auto border-gray-400 border-2 " onSubmit={formik.handleSubmit}>
            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col  h-36">
                <span className="mb-1">email :</span>
                <input
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="input input-bordered input-info input-sm"
                />
                {
                    formik.touched.email && formik.errors.email ? (<FormFieldErrorMsg msg={formik.errors.email} />) : (<FormFieldSuccessfulMsg name="email" />)
                }
                <Link to="/login">
                    <span className="link link-secondary text-xs" >Do you have an account?</span>
                </Link>
            </label>
            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
                <span className="mb-1">username :</span>
                <input
                    name="username"
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    type="text"
                    className=" input input-bordered input-info input-sm"
                />
                {
                    formik.touched.username && formik.errors.username ? (<FormFieldErrorMsg msg={formik.errors.username} />) : (<FormFieldSuccessfulMsg name="username" />)
                }
            </label>
            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
                <span className="mb-1">password :</span>
                <input
                    name="password"
                    id="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="text"
                    className=" input input-bordered input-info input-sm"
                />

                {
                    formik.touched.password && formik.errors.password ? (<FormFieldErrorMsg msg={formik.errors.password} />) : (<FormFieldSuccessfulMsg name="password" />)
                }
            </label>
            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
                <span className="mb-1">firstName :</span>
                <input
                    name="firstName"
                    id="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    type="text"
                    className=" input input-bordered input-info input-sm"
                />

                {
                    formik.touched.firstName && formik.errors.firstName ? (<FormFieldErrorMsg msg={formik.errors.firstName} />) : (<FormFieldSuccessfulMsg name="firstName" />)
                }
            </label>
            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
                <span className="mb-1">lastName :</span>
                <input
                    name="lastName"
                    id="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    type="text"
                    className=" input input-bordered input-info input-sm"
                />

                {
                    formik.touched.lastName && formik.errors.lastName ? (<FormFieldErrorMsg msg={formik.errors.lastName} />) : (<FormFieldSuccessfulMsg name="lastName" />)
                }
            </label>
            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
                <span className="mb-1">phoneNumber :</span>
                <input
                    name="phoneNumber"
                    id="phoneNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    type="text"
                    className=" input input-bordered input-info input-sm"
                />

                {
                    formik.touched.phoneNumber && formik.errors.phoneNumber ? (<FormFieldErrorMsg msg={formik.errors.phoneNumber} />) : (<FormFieldSuccessfulMsg name="phoneNumber" />)
                }
            </label>

            <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex">
                <input
                    type="checkbox"
                    className="checkbox mr-2"
                    checked={isAgree}
                    onChange={() => setIsAgree(!isAgree)}
                />
                <span>I agree to the <Link to="/rules" className="link link-secondary">rules</Link> of the website</span>
            </label>
            <button disabled={!isAgree} className="mt-8 mx-auto flex btn  btn-outline btn-info btn-sm" type="submit">signup</button>
        </form>
    )
}