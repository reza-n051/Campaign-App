import { atom } from 'jotai';

const userAtom = atom({
    username: "",
    isLogin: false,
    avatarPath: "",
    role: "USER"
});

export default userAtom;
