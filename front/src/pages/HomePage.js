import { useAtom } from "jotai";
import SearchInKarzars from "../components/SearchInKarzars";
import SignupButton from "../components/SignupButton";
import userAtom from "../jotaiAtoms/auth";
export default function HomePage(){
    const [user] = useAtom(userAtom);

    return(
        <>
            {
                user.isLogin === true ? <></> : <SignupButton name="Signup Now !!!" className="btn btn-lg btn-info btn-outline mx-auto flex"/>
            }
            <SearchInKarzars />
        </>
    )
}