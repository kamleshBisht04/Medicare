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
  const experienceYears = parseInt(docInfo?.experience);

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  // Generate available slots
  const getAvailableSlots = () => {
    if (!docInfo) return;

    let allSlots = [];

    // Current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);

      currentDate.setDate(today.getDate() + i);

      // End time
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(19, 0, 0, 0);

      // Today's timing
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 8 ? currentDate.getHours() + 1 : 8,
        );

        currentDate.setMinutes(0);
      } else {
        currentDate.setHours(8);
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

        // Check slot booked or not
        const isSlotAvailable =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Next slot after 1 hour
        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <>
        {/* Doctor Details */}
        <div className="mt-8 flex flex-col gap-6 px-4 sm:flex-row">
          {/* Left */}
          <div className="relative">
            <img
              className="gradient-profile h-auto w-full rounded-2xl shadow-md sm:max-w-80"
              src={docInfo.image}
              alt={docInfo.name}
            />

            {/* Available Badge */}
            <div
              className={`absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium text-white shadow-lg ${docInfo.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
            >
              <span className="h-2 w-2 rounded-full bg-white"></span>
              {docInfo.isAvailable ? 'Available' : 'Not Available'}
            </div>
          </div>

          {/* Right */}
          <div className="font-outfit bg-blue-50 mx-2 mt-[-80px] max-w-[1000px] flex-1 rounded-2xl border border-gray-200 p-8 py-7 pb-4 shadow-sm sm:mx-0 sm:mt-1">
            {/* Name */}
            <p className="flex items-center gap-2 text-3xl font-semibold text-gray-900">
              {docInfo.name}

              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </p>

            {/* Degree */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[15px] text-gray-600">
              <p>
                {docInfo.degree} • {docInfo.speciality}
              </p>
              {/* Experience Ribbon */}
              <div className="relative">
                <button className="border-primary bg-primary/10 text-primary rounded-full border px-4 py-1 text-xs font-medium">
                  {experienceYears} Years experience
                </button>

                <span
                  className={`absolute -top-3 -right-3 rounded-full px-2 py-[2px] text-[10px] text-white shadow ${
                    experienceYears < 3
                      ? 'bg-black'
                      : experienceYears < 3
                        ? 'bg-primary'
                        : 'bg-green-800'
                  }`}
                >
                  {experienceYears < 3
                    ? 'NEW'
                    : experienceYears < 5
                      ? 'EXPERT'
                      : 'PRO'}
                </span>
              </div>
            </div>

            {/* About */}
            <div className="mt-2">
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                About
                <img className="w-[14px]" src={assets.info_icon} alt="" />
              </p>

              <p className="mt-2 max-w-[1000px] text-justify text-sm leading-6 text-gray-600">
                {docInfo.about}
              </p>
            </div>

            {/* Fee */}
            <p className="mt-5 text-[15px] font-medium text-gray-700">
              Appointment fee :
              <span className="text-primary ml-2 text-lg font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-6 px-4 sm:ml-[21rem] sm:pl-6">
          <p className="text-lg font-semibold text-gray-800">Booking Slots</p>

          {/* Days */}
          <div className="mt-5 flex w-full items-center gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`min-w-16 cursor-pointer rounded-2xl border px-4 py-5 text-center transition-all duration-300 ${
                    slotIndex === index
                      ? 'border-primary bg-primary text-white shadow-md'
                      : 'hover:border-primary border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="mt-5 flex w-full items-center gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                    item.time === slotTime
                      ? 'bg-primary text-white shadow-md'
                      : 'hover:border-primary hover:text-primary border-gray-300 text-gray-500'
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Button */}
          <button className="bg-primary my-8 rounded-full px-14 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02]">
            Book an appointment
          </button>
        </div>
      </>
    )
  );
};

export default Appointment;
