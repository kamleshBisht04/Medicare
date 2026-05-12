import { useEffect, useState } from 'react';
import { assets, customer } from '../assets/assets';

const Header = () => {
  const headerImages = [
    assets.header_img,
    assets.header_img1,
    assets.header_img2,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // auto image change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === headerImages.length - 1 ? 0 : prev + 1,
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary mt-10 overflow-hidden rounded-3xl">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* left content */}
          <div className="py-10 text-white md:py-12">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Trusted Healthcare Platform
            </span>

            <h1 className="mt-4 text-3xl leading-tight font-semibold md:text-4xl lg:text-5xl">
              Book Appointment <br />
              With Trusted Doctors
            </h1>

            <p className="mt-6 max-w-lg text-base text-white/90 md:text-lg">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>

            {/* buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="text-primary-dark rounded-full bg-white px-7 py-3 font-semibold transition-all duration-300 hover:scale-105">
                Book Appointment
              </button>

              <a href="#speciality">
                <button className="hover:text-primary-dark rounded-full border border-white px-7 py-3 font-semibold transition-all duration-300 hover:bg-white">
                  Learn More
                </button>
              </a>
            </div>

            {/* users */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-5 pr-3">
                {customer.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="h-12 w-12 rounded-full border-2 border-white object-cover transition duration-300 hover:-translate-y-1"
                    alt="customer"
                  />
                ))}
              </div>

              <p className="text-sm text-white/90">
                10k+ Patients already booked appointments
              </p>
            </div>
          </div>

          {/* right image floating effect */}
          <div className="relative flex h-full items-end justify-center">
            <div className="relative h-[240px] w-full max-w-lg sm:h-[280px] md:h-[340px]">
              {headerImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Doctors"
                  className={`absolute inset-0 h-full w-full rounded-3xl object-cover shadow-2xl transition-all duration-1000 ${
                    currentImage === index
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'translate-y-10 scale-95 opacity-0'
                  }`}
                />
              ))}

              {/* glow effect */}
              <div className="absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-white/20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
