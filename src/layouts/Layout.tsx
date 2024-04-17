import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"

type props = {
    children: React.ReactNode,
    showHero?:boolean,
}

export const Layout = ({children, showHero = false} : props) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        {showHero && <Hero />}
        <main className="flex-1 container mx-auto py-10">
            {children}
        </main>
       <Footer />
    </div>
  )
}
