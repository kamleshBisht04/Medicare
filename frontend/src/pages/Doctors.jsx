import { useNavigate, useParams } from 'react-router-dom';
import { doctors } from '../assets/assets';
import { specialities } from '../data/specialities';

const Doctors = () => {
  const navigate = useNavigate();

  const { speciality } = useParams();

  const filterDoctors = speciality
    ? doctors.filter((doc) => doc.speciality === speciality)
    : doctors;

  return (
    <div>
      {/* heading */}
      <p className="font-outfit mt-6 text-[1.15rem] text-gray-600">
        Browse through the doctors specialist.
      </p>

      <div className="mt-5 flex flex-col items-start gap-12 sm:flex-row">
        {/* left side */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialities.map((item, index) => (
            <p
              key={index}
              onClick={() =>
                navigate(speciality === item ? '/doctors' : `/doctors/${item}`)
              }
              className={`speciality-btn ${
                speciality === item ? 'speciality-btn-active' : ''
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* doctors cards */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filterDoctors.map((item, index) => (
            <div
              onClick={() => navigate(`/doctors/appointment/${item._id}`)}
              key={index}
              className="flex min-h-[380px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-4 cursor-pointer"
            >
              {/* image */}
              <div className="bg-blue-50">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="h-52 w-full object-cover sm:h-56 md:h-60"
                />
              </div>

              {/* content */}
              <div className="flex flex-1 flex-col px-4 py-4">
                {/* top row */}
                <div className="flex items-center justify-between gap-3">
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

                  {/* button */}
                  <button
                    onClick={() =>
                      item.isAvailable && navigate(`/appointment/${item._id}`)
                    }
                    disabled={!item.isAvailable}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ${
                      item.isAvailable
                        ? 'bg-primary hover:-translate-y-0.5 hover:shadow-md'
                        : 'cursor-not-allowed bg-gray-400'
                    }`}
                  >
                    {item.isAvailable ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>

                {/* doctor name */}
                <h3 className="mt-4 line-clamp-1 text-base font-semibold text-gray-800 md:text-lg">
                  {item.name}
                </h3>

                {/* speciality */}
                <p className="mt-1 text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
