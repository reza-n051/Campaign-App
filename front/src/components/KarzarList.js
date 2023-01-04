import KarzarCard from "./KarzarCard";

export default function KarzarList({ karzarList, isAdmin = false }) {
    console.log(karzarList[0])
    console.log("karzarList[0]")
    return (
        <ul className="flex flex-wrap w-[calc(100%-100px)] mx-auto mb-32 justify-between">
            {
                karzarList.map(karzar =>
                    <li
                        key={karzar.id}
                        className="mt-4 mx-auto lg:mx-0"
                    >
                        <KarzarCard
                            isAccepted={karzar.isAccepted ?? false}
                            isActive={karzar.isActive ?? false}
                            isAdmin={isAdmin}
                            name={karzar.name}
                            count={karzar.signersCount}
                            path={karzar.imgPath}
                            id={karzar.id}
                        />
                    </li>
                )
            }
        </ul>
    )
}