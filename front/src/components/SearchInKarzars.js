import { useState } from "react"
import { useQuery, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import search from "../api/search";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import SearchResult from '../jotaiAtoms/searchResult';
import KarzarList from "./KarzarList";
export default function SearchInKarzars() {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="w-full mt-12">
            <SearchTitleSection isOpen={isOpen} setIsOpen={setIsOpen} />
            {
                isOpen ? <SearchForm /> : <></>
            }
            <SearchResultSection />
        </div>
    )
}
function SearchTitleSection({ isOpen, setIsOpen }) {
    return (
        <div className=" w-1/2 flex flex-col mx-auto">
            <h2 className="font-serif mx-auto">Search In Karzars</h2>
            <label className="mx-auto btn btn-ghost btn-circle swap swap-rotate">
                <input type="checkbox" onClick={() => setIsOpen(!isOpen)} />
                <svg className="swap-off fill-current svg-icon" width={32} height={32} viewBox="0 0 20 20">
                    <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                </svg>
                <svg className="swap-on fill-current svg-icon" width={32} height={32} viewBox="0 0 20 20">
                    <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                </svg>
            </label>
        </div>
    )
}

function SearchForm() {
    const [res, setRes] = useAtom(SearchResult);
    const qc = useQueryClient();
    const { isLoading, isIdle, isError, error } = useQuery(['search'], () => search(formik.values.name, formik.values.type), {
        onSuccess: (data) => {
            const karzars = data.karzars;
            setRes(karzars);
        }, onError: (error) => {
            toast.warn(error.message)
        }, staleTime: 50000
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            type: "All"
        }, onSubmit: () => {
            qc.invalidateQueries(['search']);
        }
    });
    if (isError) {
        return (
            <div className="felx mt-4 w-64 h-24 border-red-500 border-2 mx-auto">
                <span className="m-auto">{error.message}</span>
            </div>
        )
    }
    if (isLoading || isIdle) {
        return (
            <div className="flex mt-4 w-64 h-24 border-yellow-400 border-2 mx-auto">
                <span className="m-auto loading">Loading ...</span>
            </div>
        )
    }

    return (
        <form className="pt-8 w-[calc(100%-100px)] mx-auto flex flex-col lg:flex-row lg:space-x-5 " onSubmit={formik.handleSubmit} >
            <label htmlFor="name" className="mb-6 w-full  sm:w-4/5 lg:w-3/5 flex flex-col">
                <span className="mb-2">Name Of Karzar:</span>
                <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    id="name"
                    name="name"
                    type="text"
                    className="input input-info input-bordered w-full"
                />
            </label>
            <label className="mb-6 flex flex-col w-full sm:w-4/5 lg:w-3/5">
                <span>Type of Karzar:</span>
                <select
                    className="mt-2 select select-success"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    name="type"
                    id="type"
                >
                    <option value="All">All Karzars</option>
                    <option value="Successful">Successful Karzars</option>
                    <option value="Lab">One Day To End Karzars</option>
                    <option value="Day">Today Karzars</option>
                    <option value="Open">Open Karzars</option>
                    <option value="Close">Close Karzars</option>
                </select>
            </label>
            <button type="submit" className="btn btn-info btn-outline mt-8">Search</button>
        </form>
    )
}

function SearchResultSection() {
    const [res] = useAtom(SearchResult);
    if (res.length === 0) {
        return (
            <div className="flex mt-4 w-64 h-24 border-red-500 border-2 mx-auto">
                <span className="m-auto">No Karzar Found !!!</span>
            </div>
        )
    }
    if (res.length === 1 && res[0].karzarId === "") {
        return (
            <div className="flex mt-4 w-64 h-24 border-yellow-500 border-2 mx-auto">
                <span className="m-auto">Loading ...</span>
            </div>
        )
    }
    return (
        <>
            <KarzarList karzarList={res} />
        </>
    )
}