export const Footer = () => {
  return (
    <div className="py-8 bg-slate-900">
        <div className="mx-auto container text-white font-bold tracking-tight flex flex-col md:flex-row items-center justify-between gap-y-3">
            <span className="text-2xl md:text-3xl">Burmecious</span>
            <span className="flex gap-4 cursor-pointer">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </span>
        </div>
        <div className="mt-5 text-white font-bold flex items-center justify-center">
            Copyright @ 2024 - Burmecious | All Rights Reserved. 
        </div>

    </div>
  )
}
