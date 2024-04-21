import { ShoppingCart } from "lucide-react";
import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
};

export const RestaMenuItem = ({menuItem, addToCart}: Props) => {
    return (
        <Card className="cursor-pointer text-blue-900 flex justify-between items-center">
            <div>
                <CardHeader>
                    <CardTitle>{menuItem.name}</CardTitle>
                </CardHeader>

                <CardContent className="font-bold">
                    ${(menuItem.price / 100).toFixed(2)}
                </CardContent>
            </div>
            <Button variant="outline" className="flex gap-2 mr-6" onClick={addToCart}>
                Add 
            <ShoppingCart className="text-slate-400"/>
            </Button>
        </Card>

    )
}
