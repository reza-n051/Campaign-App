import {useAtom} from 'jotai';
import { useNavigate } from 'react-router-dom';
import userAtom from '../jotaiAtoms/auth';
export default function AuthRequired({children}){
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();
    if(user.isLogin === false){
        navigate("/login");
    }
    return children;
}