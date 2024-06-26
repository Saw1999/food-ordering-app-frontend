import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"


export const MobileNavLinks = () => {
    const {logout} = useAuth0();

    const handleGoBack = () => {
      window.history.back();
    };

  return (
    <>  
      <Link to="/" className="bg-white font-bold text-blue-900 flex items-center hover:text-slate-600">Home</Link>
      <Link to="/manage-restaurant" className="bg-white font-bold text-blue-900 flex items-center hover:text-slate-600">Manage Restaurant</Link>
      <Link to="/user-profile" className="bg-white font-bold text-blue-900 flex items-center hover:text-slate-600">Profile</Link>
      <span className="bg-white font-bold text-blue-900 flex items-center hover:text-slate-600 cursor-pointer" onClick={handleGoBack}>Go Back</span>
      <Button className="px-3 font-bold flex items-center bg-blue-900 hover:bg-slate-600" onClick={()=> logout()}>Log out</Button>
    </>
  )
}
