import { Link } from "react-router-dom"
import logo from "../assets/images/favicon.ico"
import { MobileNav } from "./MobileNav"
import { Nav } from "./Nav"

export const Header = () => {
  return (
    <div className="py-3 border-b border-b-blue-900 md:py-5">
        <div className="mx-auto container flex items-center justify-between space-x-2">
            <div className="flex space-x-3">
                <img src={logo} alt='logo' className="w-10 h-10 md:w-12 md:h-12"></img>
                <Link to="/" className="font-bold text-2xl md:text-3xl text-blue-900">
                    Burmecious
                </Link>
            </div>

            {/* navbar for small screen */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* navbar for large screen */}
            <div className="hidden md:block">
              <Nav />
            </div>
            
        </div>
    </div>
  )
}
