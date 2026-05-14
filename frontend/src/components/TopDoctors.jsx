// import { doctors } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';


const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();

  return (
    <section className="lg:px-auto mx-auto my-12 w-full max-w-[100rem] px-4 sm:px-6">
      {/* heading */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-outfit text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl">
          Top Doctors to Book
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* doctors grid */}
      <div className="xs:grid-cols-2 mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="flex min-h-[380px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* image */}
            <div className="bg-blue-50">
              <img
                src={item.image}
                alt={item.speciality}
                className="h-48 w-full object-cover sm:h-52 md:h-56"
              />
            </div>

            {/* content */}
            <div className="flex flex-1 flex-col px-4 py-4">
              {/* availability */}
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.isAvailable
                      ? 'animate-pulse bg-green-500'
                      : 'bg-red-500'
                  }`}
                />

                <p
                  className={`text-xs font-medium sm:text-sm ${
                    item.isAvailable ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </p>
              </div>

              {/* doctor name */}
              <h3 className="mt-1 line-clamp-1 font-semibold text-gray-800 sm:text-base md:text-lg lg:text-sm">
                {item.name}
              </h3>

              {/* speciality */}
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {item.speciality}
              </p>

              {/* button */}
              <button
                onClick={() =>
                  item.isAvailable &&
                  navigate(`/doctors/appointment/${item._id}`)
                }
                disabled={!item.isAvailable}
                className={`mt-auto flex min-h-[44px] w-full items-center justify-center rounded-xl px-2 py-2 text-center text-[11px] font-medium text-white transition-all duration-300 sm:px-4 sm:text-sm ${
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
      {/* more doct */}
      <div className="mt-10 flex justify-center">
        <p
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className="hover:bg-primary/88 cursor-pointer rounded-full border border-gray-300 bg-blue-50 px-8 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-white"
        >
          More Doctors
        </p>
      </div>
    </section>
  );
};

export default TopDoctors;
