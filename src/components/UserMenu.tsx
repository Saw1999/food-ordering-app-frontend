import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "./ui/dropdown-menu"
import { CircleUserRound } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"


export const UserMenu = () => {
  const {user, logout} = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 font-bold text-blue-900 flex items-center gap-2">
        <CircleUserRound className="text-blue-900"/>
        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold text-blue-900 hover:text-slate-600">Profile</Link>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Button 
          className="bg-blue-900 font-bold flex flex-1 hover:bg-slate-600"
          onClick={()=> logout()}>
            Log out
          </Button>
        </DropdownMenuItem>
    
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
