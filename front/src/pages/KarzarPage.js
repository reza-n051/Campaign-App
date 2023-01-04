import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom";
import getKarzar from "../api/getKarzar";
import signKarzar from "../api/signKarzar";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import FormFieldSuccessfulMsg from "../components/FormFieldSuccessfulMsg";
import FormFieldErrorMsg from "../components/FormFieldErrorMsg";
import { useAtom } from 'jotai';
import userAtom from '../jotaiAtoms/auth';
export default function KarzarPage() {
    const [user] = useAtom(userAtom)
    const { id } = useParams();
    const qc = useQueryClient();
    const { isLoading, isIdle, isError, error, data } = useQuery(['karzar', id], () => getKarzar(id), {
        enabled: !!id
    });
    const { mutate } = useMutation(signKarzar, {
        onSuccess: (data) => {
            qc.invalidateQueries(['karzar', id]);
            toast.success(data.message);
        }, onError: (error) => {
            toast.warn(error.message);
        }
    });
    const formik = useFormik({
        initialValues: {
            firstName: "", lastName: "", phoneNumber: ""
        }, validationSchema: Yup.object({
            firstName: Yup.string().min(2, "firstName is very long").required("required"),
            lastName: Yup.string().min(2, "lastName is very long").required("required"),
            phoneNumber: Yup.string().min(11, "phoneNumber has 11 character").max(11, "phoneNumber has 11 character").required("required !")
                .matches("09[0-9]*", "invalid phone number")
        }), onSubmit: ({ firstName, lastName, phoneNumber }) => {
            console.log(123)
            mutate({ id, firstName, lastName, phoneNumber })
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
        <div className="flex flex-col p-4 mx-auto w-[calc(100%-20px)] sm:w-[calc(100%-100px)]">
            <div className="avatar flex">
                <div className="mask mask-squircle w-40 h-40 m-auto">
                    <img src="/1.jpg" alt="Avatar" />
                </div>
            </div>
            <h1 className="font-serif font-bold text-2xl text-green-600 mx-auto my-4">{data.name}</h1>
            <textarea disabled value={data.text} className="font-serif text-xs sm:text-sm lg:text-base p-2 min-h-[15rem] max-h-[20rem] leading-loose border-cyan-300 border-2" />
            <form className="mt-4 flex flex-col" onSubmit={formik.handleSubmit}>
                <span className="my-4 m-auto font-bold text-green-500">Sign Karzar</span>
                {
                    user.isLogin
                        ?
                        null
                        :
                        <>
                            <InputSection
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                id="phoneNumber"
                                title="phone number: "
                                isTouched={!formik.touched.phoneNumber}
                                error={formik.errors.phoneNumber}
                            />
                            <InputSection
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                id="firstName"
                                title="firstName: "
                                isTouched={!formik.touched.firstName}
                                error={formik.errors.firstName}
                            />
                            <InputSection
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                id="lastName"
                                title="lastName: "
                                isTouched={!formik.touched.lastName}
                                error={formik.errors.lastName}
                            />

                        </>
                }
                <button type="submit" className="btn btn-info btn-outline w-full sm:w-[calc(50%)] lg:w-[calc(33%)] mx-auto"><span>Sign</span></button>
            </form>
            <section className="flex flex-col pt-6">
                <span className="text-green-700 text-2xl mb-2">Signers :</span>
                <ul className="flex flex-wrap justify-between">
                    {
                        data.signers.map(signer => <Signer key={signer.id} firstName={signer.firstName} lastName={signer.lastName}
                            imgSrc={`/1.jpg`} />)
                    }
                </ul>
            </section>
        </div>
    )
}
function InputSection({ value, onChange, id, title, isTouched, error }) {
    return (
        <label className="w-[calc(100%-20px)] md:w-3/5 mx-auto flex flex-col h-36">
            <input
                placeholder={title}
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
function Signer({ firstName, lastName, imgSrc }) {
    return (
        <div className="flex  items-center space-x-3 m-1 shadow-md min-w-[250px]">
            <div className="avatar ">
                <div className="mask mask-squircle w-12 h-12 bg-gray-300 flex">
                    {
                        imgSrc === "" ?
                            <img src="/2.jpg" alt="Avatar" />
                            :
                            <img src={imgSrc} alt="Avatar" />
                    }
                </div>
            </div>
            <div>
                <div className="font-serif text-sm">{firstName}</div>
                <div className="font-serif text-sm opacity-60">{lastName}</div>
            </div>
        </div>
    )
}