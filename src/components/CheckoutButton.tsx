import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { LoadingButton } from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { UserFormData, UserProfileForm } from "../form/user-profile-form/UserProfileForm";
import { useGetUser } from "../api/UserApi";

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    isLoading: boolean;
    disabled: boolean;
}

export const CheckoutButton = ({onCheckout, isLoading, disabled}: Props) => {

    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0();
    const {pathname} = useLocation();
    
    const {userData: currentUser, isLoading: isGetUserLoading} = useGetUser();

    const onLogin = async() => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        });
    };

    if(!isAuthenticated) {
        return <Button className="bg-blue-900 flex-1 hover:bg-slate-600 font-bold" onClick={onLogin}>Log in to check out</Button>
    };

    if(isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-900 flex-1 hover:bg-slate-600 font-bold" disabled={disabled}>Go to checkout</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm 
                userData={currentUser} 
                onSave={onCheckout} 
                isLoading={isGetUserLoading} 
                title="Confirm Delivery Details"
                buttonText="Proceed to payment"
                />

            </DialogContent>
        </Dialog>
    )
};
