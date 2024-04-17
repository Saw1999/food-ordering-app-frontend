import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


type props = {
    children: React.ReactNode,
}

export const AuthZeroProvider = ({children} : props) => {
    const navigate = useNavigate();
   
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;


    if (!domain || !redirectURI || !clientId || !audience){
        throw new Error("Auth initialization failed!");
    }

    const onRedirectCallback = (appState?: AppState, user?: User) =>{
        console.log("User: ", user);
        
        navigate('/auth-callback');
        
    }

    return (
        <Auth0Provider 
        domain={domain} 
        clientId={clientId} 
        authorizationParams={{
            redirect_uri: redirectURI,
            audience,
        }}
        onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    )
}
