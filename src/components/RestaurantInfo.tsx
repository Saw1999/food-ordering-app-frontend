import { Dot } from "lucide-react";
import { Restaurant } from "../types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {
    restaurant: Restaurant;
}

export const RestaurantInfo = ({restaurant}: Props) => {
  
    return (
    <Card className=" text-blue-900">
        <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                {restaurant.restaurantName}
            </CardTitle>

            <CardDescription>
                {restaurant.suburb}, {restaurant.city}, {restaurant.country}
            </CardDescription>
        </CardHeader>

        <CardContent className="flex">
            {restaurant.dishes.map((dish, index) => (
                <span key={index} className="flex">
                    <span>{dish}</span>
                    {index < restaurant.dishes.length -1 && <Dot />}
                </span>
            ))}
        </CardContent>
    </Card>
  )
}
