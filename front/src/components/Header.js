import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom"
import userAtom from "../jotaiAtoms/auth";
import Avatar from "./Avatar";

export default function Header() {
    const navigate = useNavigate();
    const [user] = useAtom(userAtom);
    return (
        <header className="flex py-2 justify-between w-[calc(100%-10px)] sm:w-[calc(100%-100px)] mx-auto h-20 mb-2">
            <div className="flex cursor-pointer mt-4" onClick={() => navigate("/")}>
                <span className="text-2xl text-red-500">M</span>
                <span className="text-2xl text-red-500">y</span>
                <span className="text-2xl text-red-500">K</span>
                <span className="text-2xl text-red-500">a</span>
                <span className="text-2xl text-red-500">r</span>
                <span className="text-2xl text-red-500">z</span>
                <span className="text-2xl text-red-500">a</span>
                <span className="text-2xl text-red-500">r</span>
            </div>
            <div>
                {
                    user.username === "" ?
                        <button onClick={() => navigate("/login")} className="btn btn-outline btn-accent"><span>Login</span></button>
                        :
                        <Avatar size="S"/>
                        
                }
            </div>
        </header>
    )
}