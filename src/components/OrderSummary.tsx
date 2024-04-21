import { Trash } from "lucide-react";
import { CartItem } from "../pages/RestaurantDetails";
import { Restaurant } from "../types"
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem : CartItem) => void;
};

export const OrderSummary = ({restaurant, cartItems, removeFromCart}: Props) => {
    const getTotalCost = () => {
        const totalCost = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);

        const totalWithDeliFee = ((totalCost + restaurant.deliFee) /100 ).toFixed(2);

        return totalWithDeliFee
    };

  return (
    <>
        <CardHeader className="text-blue-900">
            <CardTitle className="flex justify-between text-2xl font-bold tracking-tight">
                <span>Your order</span>
                <span>${getTotalCost()}</span>
            </CardTitle>
        </CardHeader>

        <CardContent className="flex gap-5 flex-col text-blue-900">
            {cartItems.map((cartItem, index) => (
                <div key={index} className="flex justify-between">
                    <span>
                        {cartItem.name}
                        <Badge variant="outline" className="ml-4 text-slate-500">
                            {cartItem.quantity}
                        </Badge>
                    </span>
                    <span className="flex gap-2 items-center">
                        <Trash className="cursor-pointer text-slate-400" size={15} onClick={() => removeFromCart(cartItem)}/>
                        ${((cartItem.price * cartItem.quantity)/100).toFixed(2)}
                    </span>
                </div>
            ))}

            <Separator />

            <div className="flex justify-between">
                <span>Delivery</span>
                <span>${(restaurant.deliFee / 100).toFixed(2)}</span>
            </div>

            <Separator />
        </CardContent>
    </>
  )
}
