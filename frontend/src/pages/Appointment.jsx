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

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  console.log(docInfo);
  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  return (
    docInfo && (
      <div className="mt-8 flex flex-col gap-6 sm:flex-row">
        {/* left section */}
        <div>
          <img
            className="gradient-banner w-full rounded-xl sm:max-w-80"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        {/* right section */}

        <div className="mx-2 mt-[-80px] flex-1 rounded-lg border border-gray-400 bg-white p-8 py-7 sm:mx-0 sm:mt-0">
          {/* Doc info :name degree experience */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-900">
            {docInfo.name}
            <img
              className="w-5"
              src={assets.verified_icon}
              alt="verified icon"
            />
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="rounded-full border px-2 py-0.5 text-xs">
              {docInfo.experience}
            </button>
          </div>
          {/*Doctor about  */}
          <div>
            <p className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-800">
              About <img className="w-[14.5px]" src={assets.info_icon} alt="" />
            </p>
            <p className="mt-1 max-w-[700px] text-sm text-gray-900">
              {docInfo.about}
            </p>
          </div>
          <p className="mt-4 font-medium text-gray-500">
            Appointment fee:{' '}
            <span className="text-gray-900">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>
      //  Booking slots
    )
  );
};

export default Appointment;
