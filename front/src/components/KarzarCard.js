import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import userAtom from "../jotaiAtoms/auth";
import KarzarCardAdminOptions from "./KarzarCardAdminOptions";

export default function KarzarCard({ id, name, path, count, isAccepted, isActive }) {
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/karzars/${id}`)
    }
    return (
        <>
            <article className={`w-72 min-h-[12rem] card image-full font-serif ${!isAccepted ? "border-cyan-400 border-4" : ""}`}>
                <figure><img src="/1.jpg" alt="Karzar" /></figure>
                {/* <figure><img src={path} alt="Karzar" /></figure> */}
                <section className="card-body">
                    <div className="card-title flex ">
                        <h2 className="card-title text-sm mb-auto w-4/5">{name}</h2>
                        {
                            user.role === "ADMIN" ? <KarzarCardAdminOptions karzarId={id} isActive={isActive} isAccepted={isAccepted} /> : null
                        }

                    </div>
                    <div className="justify-end stat w-12 ml-auto mt-auto">
                        <div className="stat-value text-sm">{count}</div>
                    </div>
                </section>

            </article>
            <button className="w-72 btn btn-info btn-outline btn-xs" onClick={handleClick}><span>View Karzar</span></button>
        </>
    )
}