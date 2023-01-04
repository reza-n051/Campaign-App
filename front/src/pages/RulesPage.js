import { useAtom } from "jotai";
import Header from "../components/Header";
import SignupButton from "../components/SignupButton";
import userAtom from "../jotaiAtoms/auth";

export default function RulesPage() {
    const [user] = useAtom(userAtom);

    return (
        <>
            {
                user.isLogin === true ? <></> : <SignupButton name="Signup Now !!!" className="btn btn-lg btn-info btn-outline mx-auto flex" />
            }
            <div className="w-[calc(100%-100px)] mx-auto flex-col flex space-y-4 font-serif">
                <h2 className="font-bold text-2xl">website rules:</h2>
                <p1>rule 1: this is a rule</p1>
                <p1>rule 2: this is a rule</p1>
                <p1>rule 3: this is a rule</p1>
                <p1>rule 4: this is a rule</p1>
            </div>
        </>
    )
}