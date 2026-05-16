import { Ambulance, Award, BadgeCheck, Stethoscope } from 'lucide-react';
import { assets } from '../assets/assets';
import { features, stats } from '../data/features';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-8 md:px-14 lg:px-20">
      <p className="text-primary my-4 text-center text-sm font-semibold tracking-[6px] uppercase">
        About Us
      </p>
      {/* About Section */}
      <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* left section */}
        <div className="relative">
          <img
            className="w-[500px] rounded-3xl object-cover shadow-2xl"
            src={assets.about_image}
            alt="about"
          />
          <div className="absolute bottom-5 left-4 rounded-2xl bg-white/50 px-5 py-4 shadow-lg backdrop-blur">
            <div className="flex items-center gap-3">
              <BadgeCheck className="text-green-500" />
              <div>
                <p className="font-semibold text-gray-800">
                  Trusted Healthcare
                </p>
                <p className="text-sm text-gray-500">
                  Verified Medical Services
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right section */}
        <div>
          <div className="border-primary/20 bg-primary/10 text-primary mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
            <Stethoscope size={18} />
            Modern Medical Platform
          </div>
          <h2 className="text-3xl leading-tight font-bold text-gray-800">
            Making Healthcare Simple, Fast & Accessible
          </h2>
          <p className="mt-6 leading-7 text-gray-600">
            At Prescripto, we understand how difficult healthcare management can
            be in today’s busy lifestyle. That’s why we built a smart and
            user-friendly platform where patients can easily book appointments,
            connect with experienced doctors, and access healthcare services
            online.
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            Our mission is to bridge the gap between patients and healthcare
            providers using modern technology, ensuring convenience, trust, and
            quality care for everyone.
          </p>
          {/* vision box  */}
          <div className="border-primary/20 from-primary/10 mt-8 rounded-3xl border bg-gradient-to-r to-white p-6">
            <div className="flex items-center gap-3">
              <Award className="text-primary" />
              <h3 className="text-xl font-semibold text-gray-800">
                Our Vision
              </h3>
            </div>
            <p className="mt-4 leading-7 text-gray-600">
              We aim to create a seamless digital healthcare ecosystem where
              every patient receives timely medical support and every doctor can
              connect with patients efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map((items, index) => (
          <div
            className="rounded-3xl border border-gray-100 bg-white p-7 text-center font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            key={index}
          >
            <h2 className="text-primary text-3xl">{items.number}</h2>
            <p className="mt-2 text-sm text-gray-500">{items.label}</p>
          </div>
        ))}
      </div>
      {/* Features */}
      <div className="mt-24">
        <div className="text-center">
          <p className="text-primary text-sm font-semibold tracking-[5px] uppercase">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-800 md:text-4xl">
            Healthcare Designed Around You
          </h2>
        </div>
        {/*featurs card section  */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((items, index) => (
            <div
              className="group hover:bg-primary rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:text-white hover:shadow-2xl"
              key={index}
            >
              <div className="bg-primary/10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:bg-white">
                {<items.icon className="text-primary h-8 w-8" />}
              </div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500 group-hover:text-white/90">
                {items.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Banner */}
      <div className="from-primary gradient-banner my-24 overflow-hidden rounded-[35px] px-8 py-10 text-white shadow-2xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Ambulance size={30} />
              <p className="text-xl font-semibold">
                Need Emergency Medical Help?
              </p>
            </div>

            <p className="max-w-2xl text-white/90">
              Our healthcare support team is available 24/7 to guide and assist
              you with urgent medical appointments and healthcare services.
            </p>
          </div>

          <button
            onClick={() => {
              navigate('/contact');
              scrollTo(0, 0);
            }}
            className="text-primary rounded-full bg-white px-7 py-3 font-semibold transition-all duration-300 hover:scale-105"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
