import { useEffect } from "react";
import { assets } from "../../assets/assets";
import useAdmin from "../../hooks/useAdmin";

const DoctorsList = () => {
  const { doctors, getAllDoctors } = useAdmin();

   useEffect(() => {
     getAllDoctors();
   }, []);

  return (
    <div className="mt-20 w-full px-16 pb-8 sm:px-6 md:px-10 lg:px-16">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Doctors List</h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage all registered doctors
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image */}
            <div className="bg-gray-50">
              <img
                src={doctor.image || assets.upload_area}
                alt={doctor.name}
                className="h-52 w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Name + Availability */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {doctor.name}
                  </h3>

                  <p className="text-primary mt-1 text-sm font-medium">
                    {doctor.speciality}
                  </p>
                </div>

                <span
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                    doctor.available ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>

              {/* Details */}
              <div className="mt-1 space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-medium text-gray-700">Degree:</span>{" "}
                  {doctor.degree}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Experience:</span>{" "}
                  {doctor.experience}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Fee:</span> ₹
                  {doctor.fees}
                </p>

                <p>
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {doctor.address.city}, {doctor.address.state}
                </p>
              </div>

              {/* Status */}
              <div className="mt-1 border-t border-gray-100 pt-3">
                <p
                  className={`text-xs font-medium ${
                    doctor.available ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {doctor.available ? "● Available" : "● Not Available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
