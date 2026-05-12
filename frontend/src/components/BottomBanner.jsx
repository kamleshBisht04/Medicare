import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const BottomBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary my-20 flex rounded-lg px-6 sm:px-10 md:mx-10 md:px-14 lg:px-12">
      {/* left section */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-5xl">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
            {/* Create Account Button */}
            <button
              onClick={() => {
                navigate('/login');
                scrollTo(0, 0);
              }}
              className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:scale-105 sm:w-auto sm:text-base"
            >
              Create Account
            </button>

            {/* Explore Doctors Button */}
            <button
              onClick={() => {
                navigate('/doctors');
                scrollTo(0, 0);
              }}
              className="w-full rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:w-auto sm:text-base"
            >
              Explore Doctors
            </button>
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="relative hidden md:block md:w-1/2 lg:w-[370px]">
        <img
          className="absolute right-0 bottom-0 w-full max-w-md"
          src={assets.appointment_img}
          alt="doctor image"
        />
      </div>
    </div>
  );
};

export default BottomBanner;
