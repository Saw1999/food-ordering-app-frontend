import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { UserMenu } from "./UserMenu"

export const Nav = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        <span className="flex items-center space-x-2 ">
            {isAuthenticated 
            ? (<UserMenu />)
            : (<Button 
                variant="ghost" 
                className="text-blue-900 hover:text-slate-600 font-bold text-xl"
                onClick={async() => await loginWithRedirect()}>
                    Log In
                </Button>)
            }
        </span>
        
    )
}
