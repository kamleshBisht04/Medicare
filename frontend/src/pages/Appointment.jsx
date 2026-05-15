/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import {
  daysOfWeek,
  getAvailableSlots,
  relatedDoctors,
} from '../data/appointmentSlots';
import DoctorBookingCard from '../components/DoctorBookingCard';

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol } = useAppContext();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const experienceYears = parseInt(docInfo?.experience);

  // Initialize booking state
  const initializeBookingState = () => {
    // Fetch doctor info
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);

    // Reset slots, index, and time
    setSlotIndex(0);
    setSlotTime('');
    setDocSlots([]);
  };
  // Fetch doctor and slots when docId changes
  useEffect(() => {
    initializeBookingState();
  }, [docId, doctors]);

  // Generate available slots
  useEffect(() => {
    if (docInfo) {
      const slots = getAvailableSlots(docInfo);
      setDocSlots(slots);
    }
  }, [docInfo]);

  return (
    docInfo && (
      <>
        {/* Doctor Details */}
        <div className="mt-8 flex flex-col gap-6 px-4 sm:flex-row">
          {/* Left */}
          <div className="relative">
            <img
              className="gradient-profile h-[320px] w-full rounded-2xl object-cover shadow-md sm:h-auto sm:max-w-80"
              src={docInfo.image}
              alt={docInfo.name}
            />

            {/* Available Badge */}
            <div
              className={`absolute -top-3 left-2 flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium text-white shadow-lg ${
                docInfo.isAvailable ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-white"></span>
              {docInfo.isAvailable ? 'Available' : 'Not Available'}
            </div>
          </div>

          {/* Right */}
          <div className="font-outfit relative z-10 mx-2 mt-6 max-w-[1000px] flex-1 rounded-2xl border border-gray-200 p-5 shadow-sm sm:mx-0 sm:mt-1 sm:p-8 sm:py-7 sm:pb-4">
            {/* Name */}
            <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
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
                      : experienceYears < 5
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
            {docSlots?.length > 0 &&
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
            {docSlots?.length > 0 &&
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

          {docInfo.isAvailable ? (
            <button className="bg-primary my-8 rounded-full px-14 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02]">
              Book an appointment
            </button>
          ) : (
            <p className="mt-3 text-sm font-medium text-red-500">
              Currently Unavailable
            </p>
          )}
        </div>

        {/* Related Doctors Section */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Related Doctors
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Meet other trusted specialists
            </p>
          </div>

          <div
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {relatedDoctors(docInfo)
              .slice(0, 4)
              .map((item, index) => (
                <DoctorBookingCard key={index} doctor={item} index={index} />
              ))}
          </div>
        </div>
      </>
    )
  );
};

export default Appointment;
