import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query";
import { toast } from "sonner";

const APT_BASE_URL = import.meta.env.VITE_API_BASE_URL // api url of our backend
export type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
};

// create a custom useCreateCheckoutSession hook for checkout functionality
export const useCreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createCheckoutSessionRequest = async(checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently();

        const res= await fetch(`${APT_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest),

        });

        if(!res.ok){
            throw new Error("Unable to create checkout session")
        }

        return res.json();

    };

    const {mutateAsync: createCheckoutSession, isLoading, reset, error} = useMutation(createCheckoutSessionRequest);

    if(error){
        toast.error(error.toString());
        reset(); 
    }

    return {createCheckoutSession, isLoading};
};