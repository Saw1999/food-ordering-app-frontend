import hero from "../assets/images/hero2.jpg"    

export const Hero = () => {
  return (
    <div>
        <img src={hero} alt='' className="max-h-[400px] w-full object-fit md:object-contain md:bg-slate-900"/>
    </div>
  )
}
