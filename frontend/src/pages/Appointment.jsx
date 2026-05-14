/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useAppContext();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(19, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 9 ? currentDate.getHours() + 1 : 9,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 60 ? 60 : 0);
      } else {
        currentDate.setHours(9);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked[slotDate] &&
          docInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <>
        <div className="mt-8 flex flex-col gap-6 px-4 sm:flex-row">
          {/* left section */}
          <div>
            <img
              className="gradient-profile h-auto w-full rounded-xl shadow-sm sm:max-w-80"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* right section */}

          <div className="font-outfit mx-2 mt-[-80px] max-w-[950px] flex-1 rounded-lg border border-gray-300 bg-white p-8 py-7 shadow-sm sm:mx-0 sm:mt-1">
            {/* Doc info :name degree experience */}
            <p className="flex items-center gap-2 text-3xl font-semibold text-gray-900">
              {docInfo.name}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="verified icon"
              />
            </p>
            <div className="mt-1 flex items-center gap-4 text-[1rem] text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="rounded-full border px-2 py-0.5 text-xs">
                {docInfo.experience}
              </button>
            </div>
            {/*Doctor about  */}
            <div>
              <p className="mt-5 flex items-center gap-1 text-sm font-medium text-gray-800">
                About{' '}
                <img className="w-[14.5px]" src={assets.info_icon} alt="" />
              </p>
              <p className="mt-1 max-w-[700px] text-justify text-sm text-gray-900"></p>
              {docInfo.about}
            </div>
            <p className="mt-4 font-medium text-gray-700">
              Appointment fee:{' '}
              <span className="text-gray-900">
                {' '}
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*   Booking slots */}
        <div className="ml-80 pl-6 font-medium text-gray-600">
          <p className="mt-6 font-semibold">Booking slots</p>
          
        </div>
      </>
    )
  );
};

export default Appointment;
