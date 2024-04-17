import landingImg from '../assets/images/landing-page.webp'
import downloadApp from '../assets/images/appDownload.png'

export const Home = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="py-4 bg-white -mt-16 flex flex-col gap-3 md:gap-5 shadow-md text-center rounded-lg text-blue-900">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight">Tuck into a takeway with Burmecious</h1>
            <span className="text-l md:text-xl font-medium">Food is just at your fingertips</span>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingImg} alt='' />
            <div className='text-blue-900 text-center flex flex-col justify-center items-center gap-4'>
                <span className='font-bold text-2xl md:text-3xl tracking-tight'>Join us now to bring your dishes to your doorstep</span>
                <span>Download our Burmecious App for faster ordering and delivering services</span>
                <img src={downloadApp} alt='' />
            </div>
        </div>
    </div>
  )
}
