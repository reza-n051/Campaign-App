import { useQuery } from "react-query"
import { useParams } from "react-router-dom";
import getKarzarsOfUser from "../api/getKarzarsOfUser";
import KarzarList from "../components/KarzarList";

export default function UserKarzarsPage() {
    const { username } = useParams();
    const { isError, isLoading, error, data,isIdle } = useQuery(
        ['my-karzars', username],
        () => getKarzarsOfUser(),
        {
            enabled: !!username
        }
    );
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
        <KarzarList isAdmin={true} karzarList={data.karzars} />
    )
}