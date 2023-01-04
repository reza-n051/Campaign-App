import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom";
import userAtom from "../jotaiAtoms/auth"
import isImageExist from "../utils/isImgeExist";

export default function Avatar({ size }) {
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();
    return (
        <div className="cursor-pointer" onClick={()=>navigate(`/profile/${user.username}`)}>
            
            {
                user.avatarPath !== "" && isImageExist(user.avatarPath) ?
                    <AvatarWithImage size={size} alt={user.username} src="/1.jpg" />
                    :
                    <AvatarWithoutImage size={size} title={user.username.charAt(0).toUpperCase()}/>
            }
        </div>
    )
}

function AvatarWithoutImage({ size, title }) {
    return (
        <div className="avatar  placeholder">
            <div className={`bg-neutral-focus text-neutral-content rounded-full ${size === "S" ? "w-16 h-16" : "w-64 h-64"}`}>
                <span className="text-2xl">{title}</span>
            </div>
        </div>
    )
}
function AvatarWithImage({ size, alt, src }) {
    return (
        <div className="avatar">
            <div className={`rounded-full ${size === "S" ? "w-16 h-16" : "w-64 h-64"}`}>
                <img src={src} alt={alt} />
            </div>
        </div>
    )
}