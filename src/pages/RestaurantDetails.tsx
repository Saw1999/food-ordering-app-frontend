import { useParams } from "react-router-dom"
import { useGetRestaurantById } from "../api/RestaApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { RestaMenuItem } from "../components/RestaMenuItem";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import { OrderSummary } from "../components/OrderSummary";
import { MenuItem } from "../types";
import { CheckoutButton } from "../components/CheckoutButton";
import { UserFormData } from "../form/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "../api/OrderApi";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

export const RestaurantDetails = () => {
    const {restaurantId} = useParams();
    const {restaurantData, isLoading} = useGetRestaurantById(restaurantId);
    const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {

            //checking if the menuItem is already in the cart
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems;

            // if the menuItem is in the cart, update the quantity
            //if not, add the menuItem as a new item to the cart
            if(existingCartItem){
                updatedCartItems = prevCartItems.map((cartItem) => 
                    cartItem._id === menuItem._id 
                    ? {...cartItem, quantity: cartItem.quantity + 1 } 
                    : cartItem)
            }
            else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,

                    }
                ];
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        });
    };

    const onCheckout = async(userFormData: UserFormData) => {

        if(!restaurantData){
            return;
        }
    
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurantData._id,
            deliDetails: {
                email: userFormData.email as string, //since it is optional
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                addressLine2: userFormData.addressLine2,
                city: userFormData.city,
                country: userFormData.country
            }
        };

        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url;
    };

    if(isLoading || !restaurantData){
        return <span>Loading.....</span>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurantData.imageUrl} className="w-full h-full rounded-md object-cover" />
            </AspectRatio>

            <div className="grid gap-5 md:grid-cols-[4fr_2fr] md:px-30">
                <div className="flex flex-col gap-4">

                    <RestaurantInfo restaurant={restaurantData}/>

                    <span className="mt-5 text-2xl text-blue-900 font-bold tracking-tight text-center">Menu</span>

                    {restaurantData.menuItems.map((menuItem, index) =>(
                        <RestaMenuItem 
                        key={index} 
                        menuItem={menuItem} 
                        addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary 
                        restaurant={restaurantData} 
                        cartItems={cartItems} 
                        removeFromCart={removeFromCart}
                        />

                        <CardFooter>
                            <CheckoutButton 
                            disabled={cartItems.length === 0} 
                            isLoading= {isCheckoutLoading}
                            onCheckout={onCheckout}/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
