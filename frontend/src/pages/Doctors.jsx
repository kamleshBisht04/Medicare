import { useNavigate, useParams } from 'react-router-dom';

import { specialities } from '../data/specialities';
import { useAppContext } from '../context/AppContext';
import DoctorBookingCard from '../components/DoctorBookingCard';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useAppContext();

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
            <DoctorBookingCard doctor={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
