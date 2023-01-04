import { useMutation, useQueryClient } from "react-query"
import acceptKarzar from "../api/acceptKarzar";
import inActiveKarzar from "../api/inActiveKarzar";
import activeKarzar from "../api/activeKarzar";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
export default function KarzarCardAdminOptions({ karzarId, isActive, isAccepted }) {
    const queryClient = useQueryClient();
    const acceptM = useMutation(acceptKarzar, {
        onSuccess: () => {
            queryClient.invalidateQueries("my-karzars");
            queryClient.invalidateQueries("search");
        }, onError: (err) => {
            toast.warn(err.message)
        }
    });
    const activeM = useMutation(activeKarzar, {
        onSuccess: () => {
            queryClient.invalidateQueries("my-karzars");
            queryClient.invalidateQueries("search");
        }, onError: (err) => {
            toast.warn(err.message)
        }
    });
    const inActiveM = useMutation(inActiveKarzar, {
        onSuccess: () => {
            queryClient.invalidateQueries("my-karzars");
            queryClient.invalidateQueries("search");
        }, onError: (err) => {
            toast.warn(err.message)
        }
    });

    const handleAccept = (e) => {
        e.preventDefault();
        confirmAlert({
            title: "Confirm for accept karzar!!",
            message: "Are you sure?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => acceptM.mutate({ id:karzarId })
                }, {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });

    };
    const handleActive = (e) => {
        e.preventDefault();
        confirmAlert({
            title: "Confirm for active karzar!!",
            message: "Are you sure?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => activeM.mutate({ id:karzarId })
                }, {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    };
    const handleInActive = (e) => {
        e.preventDefault();
        confirmAlert({
            title: "Confirm for inActive karzar!!",
            message: "Are you sure?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => inActiveM.mutate({ id:karzarId })
                }, {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    };

    return (
        <div className="dropdown justify-end ml-auto">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </label>
            <ul tabIndex="0" className="menu menu-compact dropdown-content px-4 shadow-xl w-20">
                {
                    isActive ? <KCAOtion name="inActive" onClick={handleInActive} /> : <KCAOtion name="active" onClick={handleActive} />
                }
                {
                    isAccepted ? null : <KCAOtion name="accept" onClick={handleAccept} />
                }
            </ul>
        </div>
    )
}
function KCAOtion({ name, onClick }) {
    return (
        <li className="cursor-pointer border-l-2 border-red-500 hover:border-yellow-400 text-sm" onClick={onClick}>{name}</li>
    )
}