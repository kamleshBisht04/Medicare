import { useNavigate } from 'react-router-dom';

const DoctorBookingCard = ({ doctor, index }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/doctors/appointment/${doctor._id}`)}
      key={index}
      className="flex min-h-[380px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-300 bg-white transition-all duration-300 hover:-translate-y-4"
    >
      {/* image */}
      <div className="overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-50">
        <img
          src={doctor.image}
          alt={doctor.speciality}
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
                doctor.isAvailable ? 'animate-pulse bg-green-500' : 'bg-red-500'
              }`}
            />

            <p
              className={`text-xs font-medium sm:text-sm ${
                doctor.isAvailable ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {doctor.isAvailable ? 'Available' : 'Not Available'}
            </p>
          </div>

          {/* button */}
          <button
            onClick={() =>
              doctor.isAvailable && navigate(`/appointment/${doctor._id}`)
            }
            disabled={!doctor.isAvailable}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ${
              doctor.isAvailable
                ? 'bg-primary hover:-translate-y-0.5 hover:shadow-md'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            {doctor.isAvailable ? 'Book Now' : 'Unavailable'}
          </button>
        </div>

        {/* doctor name */}
        <h3 className="mt-2 line-clamp-1 text-base font-semibold text-gray-800 md:text-lg">
          {doctor.name}
        </h3>

        {/* speciality */}
        <p className="mt-1 text-sm font-semibold text-gray-400">
          {doctor.speciality}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">
            Experience <span className="font-bold">|</span>
          </p>
          <h4 className="text-sm text-gray-400">
            {doctor.experience || '5+ Years'}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DoctorBookingCard;
