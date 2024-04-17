import { CircleUserRound, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { MobileNavLinks } from "./MobileNavLinks"


export const MobileNav = () => {
    const {isAuthenticated, loginWithRedirect, user} =useAuth0()
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-blue-900 text-2xl" />
        </SheetTrigger>

        <SheetContent className="space-y-4">
            <SheetTitle>
                {isAuthenticated 
                ? (<span className="text-blue-900 font-bold flex items-center gap-2">
                    <CircleUserRound />
                    {user?.email}
                </span>)
                : <span className="text-blue-900">Welcome to Burmecious. We are happy to deliver your order right to your doorstep.</span>
                }          
            </SheetTitle>

            <Separator />

            <SheetDescription className="flex flex-col gap-4">
                {isAuthenticated
                ? (<MobileNavLinks />)
                : (<Button 
                    className="bg-blue-900 font-bond flex-1"
                    onClick={async()=> await loginWithRedirect()}>Log in</Button>)
                }
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
