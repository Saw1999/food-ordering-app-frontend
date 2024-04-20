import { Link } from "react-router-dom";

type Props = {
    totalResta: number;
    city: string;
}

export const SearchRestaInfo = ({totalResta, city}: Props) => {
    return (
    <div className="flex flex-col gap-3 font-bold text-xl text-blue-900 justify-between lg:items-center lg:flex-row">
        <span>
            {totalResta} restaurants found in {city}
            <Link to="/" className="font-semibold text-sm underline text-slate-600 cursor-pointer ml-2">Change Location</Link>
        </span>
    </div>
    )
}
