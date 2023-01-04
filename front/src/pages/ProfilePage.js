import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import getUser from "../api/getUser";

export default function ProfilePage() {
    return (
        <div className="flex flex-col">
            <nav className="w-[calc(100%-100px)] mx-auto font-serif flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-center">
                <Link to="edit-profile" className="w-3/5 sm:w-1/4 mx-auto btn btn-outline btn-success">Edit Profile</Link>
                <Link to="create-karzar" className="w-3/5 sm:w-1/4 mx-auto btn btn-outline btn-success">Create Karzar</Link>
                <Link to="view-karzars" className="w-3/5 sm:w-1/4 mx-auto btn btn-outline btn-success">View Karzars</Link>
            </nav>
            <Outlet/>
        </div>
    )
}