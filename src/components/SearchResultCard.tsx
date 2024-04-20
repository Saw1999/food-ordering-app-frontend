import { Link } from "react-router-dom";
import { Restaurant } from "../types"
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant;
}

export const SearchResultCard = ({restaurant}: Props) => {
    return (
        <Link to={`/details/${restaurant._id}`} className="grid gap-5 lg:grid-cols-[2fr_3fr] group text-blue-900">
            <AspectRatio ratio={16/6}>
                <img src={restaurant.imageUrl} className="w-full h-full rounded-md object-cover"/>
            </AspectRatio>
            <div>
                <h3 className="mb-2 text-xl md:text-2xl font-bold tracking-tight group-hover:underline">
                    {restaurant.restaurantName}
                </h3>
                <div id="card-content" className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-wrap">
                        {restaurant.dishes.map((dish, index) => (
                            <span key={index} className="flex">
                                <span>{dish}</span>
                                {index < restaurant.dishes.length - 1 && <Dot />}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-green-700 flex gap-1 items-center">
                            <Clock className="text-green-700"/>
                            {restaurant.estiDeliTime} minutes
                        </div>
                        <div className="flex items-center gap-1">
                            <Banknote />
                            Delivery from ${restaurant.deliFee} 
                        </div>
                    </div>
                </div>
            </div>
            
        </Link>
    )
}
