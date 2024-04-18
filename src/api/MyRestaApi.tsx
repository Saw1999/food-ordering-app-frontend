import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const APT_BASE_URL = import.meta.env.VITE_API_BASE_URL // api url of our backend

// creating custom useGetMyRestaurant hook
export const useGetMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurantRequest = async(): Promise<Restaurant> => {

        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${APT_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if(!res.ok){
            throw new Error("Failed to fetch restaurant data!");
        }

        return res.json();
    };

    const {data: myRestaurantData, isLoading, error} = useQuery("fetchMyRestaurantData", getMyRestaurantRequest);

    if(error){
        toast.error(error.toString());
    }

    return {myRestaurantData, isLoading}

};

// creating custom useCreateRestaurant hook
export const useCreateRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createRestaurantRequest = async(restaFormData: FormData)
    : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${APT_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaFormData,
        });

        if(!res.ok) {
            throw new Error("Failed to create a restaurant!")
        }

        return res.json();
    };

    const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createRestaurantRequest);

    if (isSuccess){
        toast.success("Restaurant created!")
    }
    
    if(error){
        toast.error("Something went wrong!")
    }

    return { createRestaurant, isLoading }; 

};

// creating custom useUpdateRestaurant hook
export const useUpdateRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateRestaurantRequest = async(restaFormData: FormData)
    : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${APT_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaFormData,
        });

        if(!res.ok) {
            throw new Error("Something wen wrong while updating the restaurant!")
        }

        return res.json();
    };

    const {mutate: updateRestaurant, isLoading, isSuccess, error} = useMutation(updateRestaurantRequest);

    if (isSuccess){
        toast.success("Restaurant updated!")
    }
    
    if(error){
        toast.error("Something went wrong!")
    }

    return { updateRestaurant, isLoading }; 
};

