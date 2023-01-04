import { atom } from 'jotai';

const searchResult = atom([
    { karzarId: "", name: "", imgPath: "", signersCount: 0, isActive: true, isAccepted: true },
]);

export default searchResult;
