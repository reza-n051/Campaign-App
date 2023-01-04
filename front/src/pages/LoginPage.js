import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation } from "react-query";
import * as Yup from 'yup';
import FormFieldErrorMsg from "../components/FormFieldErrorMsg";
import FormFieldSuccessfulMsg from "../components/FormFieldSuccessfulMsg";
import userAtom from "../jotaiAtoms/auth";
import { useAtom } from "jotai";
import { useNavigate } from 'react-router-dom';
import SignupButton from "../components/SignupButton";
import login from "../api/login";
import { setToken } from "../utils/localStoarage";
export default function LoginPage() {
    const [user, setUser] = useAtom(userAtom);
    const navigate = useNavigate();
    const { mutate } = useMutation(login, {
        onSuccess: (data) => {
            const userData = data;
            setUser({ ...user, role: userData.role, avatarPath: userData.imgPath, username: userData.username, isLogin: true });
            console.log(`sssssss is ${userData.role}`);
            setToken(userData.token);
            if (userData.role === "ADMIN") {
                navigate(`/admin`);

            } else {
                navigate(`../profile/${userData.username}`);
            }
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