import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "../types";

const APT_BASE_URL = import.meta.env.VITE_API_BASE_URL // api url of our backend

// getting custom useGetUser hook to get user info
export const useGetUser = () => {
    const {getAccessTokenSilently} = useAuth0(); // fetching the user token from auth0 server

    const getUserRequest = async(): Promise<User> =>{
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(`${APT_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to get user data.");
        }

        return res.json();
    };

    const {data: userData, isLoading, error} = useQuery("fetchUserData", getUserRequest);

    if(error){
        toast.error(error.toString());
    }
    
    return{userData, isLoading};
};

// creating custom useCreateUser hook
type createUserRequestParams = {
    auth0Id : string;
    email: string;
};

export const useCreateUser = () => {
    const {getAccessTokenSilently} = useAuth0(); // fetching the user token from auth0 server

    const createUserRequest = async(user: createUserRequestParams) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${APT_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user), // coverting object to json string
        });

        if (!res.ok) {
            throw new Error("Failed to create user!")
        }
    };

    const {mutateAsync: createUser, isLoading, isError, isSuccess} = useMutation(createUserRequest);

    return {createUser, isLoading, isError, isSuccess};
};

//create useUpdateUser hook to update user profile

type updateUserRequestParams = {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
};

export const useUpdateUser = () =>{
    const {getAccessTokenSilently} = useAuth0(); // fetching the user token from auth0 server

    const updateUserRequest = async(formData : updateUserRequestParams) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${APT_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        });

        if (!res.ok) {
            throw new Error("Failed to update user profile!")
        };
    };

    const {mutateAsync: updateUser, isLoading, isSuccess, error, reset} = useMutation(updateUserRequest);

    if(isSuccess) {
        toast.success("Successfully updated user profile!");
    }

    if(error) {
        toast.error(error.toString());
        reset();
    }

    return {updateUser, isLoading};
};