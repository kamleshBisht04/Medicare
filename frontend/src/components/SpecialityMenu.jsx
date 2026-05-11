import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';
const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="font-outfit text-3xl font-medium">Find by Speciality</h1>
      <p className="text-center text-sm text-gray-700 sm:w-1/3">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="scrollbar-hide flex w-full gap-8 overflow-scroll pt-5 sm:justify-center">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            className="flex flex-shrink-0 cursor-pointer flex-col items-center text-xs transition-all duration-500 hover:translate-y-[-10px]"
          >
            <img
              className="mb-2 w-16 sm:w-24"
              src={item.image}
              alt={item.speciality}
            />
            <p className="hover:text-primary-text text-xs font-semibold">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
