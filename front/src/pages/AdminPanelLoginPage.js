import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation } from "react-query";
import * as Yup from 'yup';
import FormFieldErrorMsg from "../components/FormFieldErrorMsg";
import FormFieldSuccessfulMsg from "../components/FormFieldSuccessfulMsg";
import signup from "../api/signup";
import { useAtom } from "jotai";
import { useNavigate } from 'react-router-dom';
import SignupButton from "../components/SignupButton";
import userAtom from "../jotaiAtoms/auth";
import { setToken } from "../utils/localStoarage";

export default function AdminPanelLoginPage() {
    const [user, setUser] = useAtom(userAtom);
    const navigate = useNavigate();
    const { mutate } = useMutation(signup, {
        onSuccess: (data) => {
            const userData = data;
            setUser({ 
                ...user,
                username: userData.username, 
                isLogin: true,
                role:"ADMIN" 
            });
            setToken(userData.token);
            navigate(`/admin-panel`);
        }, onError: (error) => {
            toast.warn(error.message)
        }
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        }, validationSchema: Yup.object({
            username: Yup.string().min(4, "username should be 4 character or much").required("username is required"),
            password: Yup.string().min(4, "password should be 4 character or much").required("password is required")
        }), onSubmit: values => {
            const { password, username } = values;
            mutate({ password, username })
        }
    });
    return (
        <>
            <form className="my-16 w-4/5 md:w-3/5 lg:w-2/5 mx-auto border-gray-400 border-2 " onSubmit={formik.handleSubmit}>
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
                    <Link to="/forget-password">
                        <span className="link link-secondary text-xs" >Forget password?</span>
                    </Link>                </label>
                <button className="mx-auto flex btn  btn-outline btn-info btn-sm" type="submit">login</button>
            </form>
            <SignupButton className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto btn btn-outline btn-accent" name="Don't have an account?" />

        </>
    )
}