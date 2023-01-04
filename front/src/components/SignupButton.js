import { useNavigate } from "react-router-dom"

export default function SignupButton({name,className}) {
    const navigate = useNavigate();
    return (

        <button
            onClick={() => navigate("/signup")}
            className={className}
        >{name}</button>
    )
}