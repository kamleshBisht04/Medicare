import { doctors } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {
  const navigate = useNavigate();
  return (
    <div className="my-16 flex flex-col items-center gap-4 text-gray-800 md:mx-10">
      <h1 className="font-outfit text-3xl font-medium">Top Doctors to Book</h1>
      <p className="text-center text-sm text-gray-700 sm:w-1/3">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid w-full grid-cols-2 gap-6 pt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* image */}
            <div className="bg-blue-50">
              <img
                src={item.image}
                alt={item.speciality}
                className="h-28 w-full object-cover md:h-[14rem]"
              />
            </div>
            {/* content */}
            <div className="px-5 py-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full border-none outline-none ${item.isAvailable ? 'animate-pulse bg-green-500' : 'bg-red-500'}`}
                />
                <p
                  className={`text-sm ${item.isAvailable ? 'text-green-600' : 'text-red-600'}`}
                >
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </p>
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-800 md:text-lg">
                {item.name}
              </p>
              <p className="text-sm text-gray-500">{item.speciality}</p>

              {/* Appointment Button */}
              <button
                onClick={() =>
                  item.isAvailable && navigate(`/appointment/${item._id}`)
                }
                disabled={!item.isAvailable}
                className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-medium text-white transition-all duration-300 ${
                  item.isAvailable
                    ? 'bg-primary hover:-translate-y-1 hover:shadow-lg'
                    : 'cursor-not-allowed bg-gray-400'
                }`}
              >
                {item.isAvailable
                  ? 'Book Appointment'
                  : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
