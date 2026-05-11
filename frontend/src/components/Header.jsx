import { assets, customer } from '../assets/assets';

const Header = () => {
  return (
    <section className="bg-primary mt-10 rounded-3xl">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* left content */}
          <div className="py-10 text-white md:py-12">
            <h1 className="text-3xl leading-tight font-semibold md:text-4xl lg:text-5xl">
              Book Appointment <br />
              With Trusted Doctors
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/90 md:text-lg">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="text-primary-dark rounded-full bg-white px-7 py-3 font-semibold transition-all duration-300 hover:scale-105">
                Book Appointment
              </button>
              <button className="hover:text-primary-dark rounded-full border border-white px-7 py-3 font-semibold transition-all duration-300 hover:bg-white">
                Learn More
              </button>
            </div>
            {/* Users */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-5 pr-3">
                {customer.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="z-2 h-12 w-12 rounded-full border-2 border-white transition duration-300 hover:-translate-x-2"
                    alt="customer image "
                  />
                ))}
              </div>
              <p className="text-sm text-white/90">
                10k+ Patients already booked appointments
              </p>
            </div>
          </div>
          {/* right content */}
          <div className="relative flex h-full items-end justify-center">
            <img
              src={assets.header_img}
              alt="Doctors image "
              className="w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
