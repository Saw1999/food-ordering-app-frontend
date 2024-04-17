import { useAuth0 } from "@auth0/auth0-react"
import { useCreateUser } from "../api/UserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallBack = () => {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const {createUser} = useCreateUser();

    const hasCreatedUser = useRef(false);

    useEffect(() => {

        // Create a user in the database if the user is successfully registered
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({auth0Id: user.sub, email: user.email});
            hasCreatedUser.current = true;
        }
        navigate("/");
    },[createUser, navigate, user]);

    return (
        <>
            Loading.....
        </>
    )

}
