/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { assets } from "../../assets/assets";
import useADoctor from "../../hooks/useDoctor";
import {
  Check,
  CheckCheck,
  X,
  CalendarDays,
  Clock,
  IndianRupee,
} from "lucide-react";
import { format_Date } from "../../data/formatDate";

const DoctorAppointments = () => {
  const {
    appointments,
    dToken,
    getDoctorAppointments,
    updateAppointmentStatus,
  } = useADoctor();

  useEffect(() => {
    if (dToken) {
      getDoctorAppointments();
    }
  }, [dToken]);

  // Confirm / Complete / Cancel appointment
  const handleAppointmentStatus = async (appointmentId, status) => {
    await updateAppointmentStatus(appointmentId, status);
  };

  return (
    <div className="mt-12 min-h-screen w-full bg-[#f8fafc] p-3 sm:p-4 md:p-5 lg:p-6">
      {/* Page Header */}
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
            My Appointments
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage and track all patient appointments from here.
          </p>
        </div>

        {/* Appointment Count */}
        <div className="flex w-fit items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2">
          <CalendarDays size={17} className="text-indigo-600" />

          <span className="text-xs font-medium text-indigo-700 sm:text-sm">
            {appointments?.length || 0} Appointments
          </span>
        </div>
      </div>

      {/* Appointment Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
        {/* Desktop Table Header */}
        <div className="hidden grid-cols-[0.4fr_2.5fr_1.5fr_1fr_1fr_1fr_1.2fr] gap-4 border-b border-gray-200 bg-gray-50/80 px-6 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase md:grid">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Payment</p>
          <p className="pl-6">Status</p>
          <p className="pl-6">Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments?.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="border-b border-gray-100 px-3 py-4 transition-all duration-200 last:border-b-0 hover:bg-gray-50/60 sm:px-5 sm:py-4 md:grid md:grid-cols-[0.4fr_2.5fr_1.5fr_1fr_1fr_1fr_1.2fr] md:items-center md:gap-4 md:px-6"
            >
              {/* ================= MOBILE LAYOUT ================= */}
              <div className="md:hidden">
                {/* Mobile Top Section */}
                <div className="flex items-start justify-between gap-3">
                  {/* Patient */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.userData?.image || assets.upload_area}
                        alt={item.userData?.name || "Patient"}
                        className="h-10 w-10 rounded-full border border-gray-200 bg-gray-50 object-cover"
                      />

                      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {item.userData?.name || "Unknown Patient"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {item.userData?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Number */}
                  <span className="shrink-0 text-xs font-medium text-gray-400">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Mobile Divider */}
                <div className="my-3 border-t border-gray-100" />

                {/* Date & Time */}
                <div>
                  <p className="mb-1 text-[11px] font-medium text-gray-400 uppercase">
                    Appointment
                  </p>

                  <div className="flex items-center gap-1.5">
                    <CalendarDays
                      size={13}
                      className="shrink-0 text-indigo-500"
                    />

                    <p className="truncate text-xs font-medium text-gray-700">
                      {format_Date(item?.slotDate) || "-"}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5">
                    <Clock size={12} className="shrink-0 text-gray-400" />

                    <p className="text-xs text-gray-500">
                      {item.slotTime || "-"}
                    </p>
                  </div>
                </div>

                {/* Mobile Bottom Section */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {/* Fees */}
                  <div className="flex items-center gap-1">
                    <IndianRupee size={14} className="text-gray-500" />

                    <p className="text-sm font-semibold text-gray-700">
                      {item.amount || item.docData?.fees || 0}
                    </p>
                  </div>

                  {/* Payment */}
                  <div>
                    {item.payment ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700 ring-1 ring-green-100 ring-inset">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 ring-1 ring-amber-100 ring-inset">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    {item.status === "cancelled" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600 ring-1 ring-red-100 ring-inset">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Cancelled
                      </span>
                    ) : item.status === "confirmed" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700 ring-1 ring-green-100 ring-inset">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Confirmed
                      </span>
                    ) : item.status === "completed" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 ring-1 ring-blue-100 ring-inset">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 ring-1 ring-amber-100 ring-inset">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="ml-auto flex items-center gap-2">
                    {/* Cancelled / Completed */}
                    {item.status === "cancelled" ||
                    item.status === "completed" ? (
                      <span className="text-[11px] text-gray-400">
                        No action
                      </span>
                    ) : item.status === "confirmed" ? (
                      <>
                        {/* Complete */}
                        <button
                          onClick={() =>
                            handleAppointmentStatus(item._id, "completed")
                          }
                          title="Complete appointment"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <CheckCheck size={16} strokeWidth={2} />
                        </button>

                        {/* Cancel */}
                        <button
                          onClick={() =>
                            handleAppointmentStatus(item._id, "cancelled")
                          }
                          title="Cancel appointment"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Confirm */}
                        <button
                          onClick={() =>
                            handleAppointmentStatus(item._id, "confirmed")
                          }
                          title="Confirm appointment"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-green-200 bg-white text-green-600 transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                        >
                          <Check size={16} strokeWidth={2} />
                        </button>

                        {/* Cancel */}
                        <button
                          onClick={() =>
                            handleAppointmentStatus(item._id, "cancelled")
                          }
                          title="Cancel appointment"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= DESKTOP LAYOUT ================= */}

              {/* Number */}
              <p className="hidden text-sm font-medium text-gray-400 md:block">
                {String(index + 1).padStart(2, "0")}
              </p>

              {/* Patient */}
              <div className="hidden min-w-0 md:flex md:items-center md:gap-3">
                <div className="relative shrink-0">
                  <img
                    src={item.userData?.image || assets.upload_area}
                    alt={item.userData?.name || "Patient"}
                    className="h-10 w-10 rounded-full border border-gray-200 bg-gray-50 object-cover"
                  />

                  <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {item.userData?.name || "Unknown Patient"}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {item.userData?.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="hidden md:block">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-indigo-500" />

                  <p className="text-sm font-medium text-gray-700">
                    {format_Date(item?.slotDate) || "-"}
                  </p>
                </div>

                <div className="mt-1 flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />

                  <p className="text-xs text-gray-500">
                    {item.slotTime || "-"}
                  </p>
                </div>
              </div>

              {/* Fees */}
              <div className="hidden items-center gap-1 md:flex">
                <IndianRupee size={14} className="text-gray-500" />

                <p className="text-sm font-semibold text-gray-700">
                  {item.amount || item.docData?.fees || 0}
                </p>
              </div>

              {/* Payment */}
              <div className="hidden md:block">
                {item.payment ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-green-100 ring-inset">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 ring-1 ring-amber-100 ring-inset">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Pending
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="hidden md:block">
                {item.status === "cancelled" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 ring-1 ring-red-100 ring-inset">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Cancelled
                  </span>
                ) : item.status === "confirmed" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-green-100 ring-inset">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Confirmed
                  </span>
                ) : item.status === "completed" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-blue-100 ring-inset">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 ring-1 ring-amber-100 ring-inset">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Pending
                  </span>
                )}
              </div>

              {/* Action */}
              <div className="ml-4 hidden items-center gap-2 md:flex">
                {/* Cancelled / Completed */}
                {item.status === "cancelled" || item.status === "completed" ? (
                  <span className="text-xs text-gray-400">No action</span>
                ) : item.status === "confirmed" ? (
                  <>
                    {/* Complete */}
                    <button
                      onClick={() =>
                        handleAppointmentStatus(item._id, "completed")
                      }
                      title="Complete appointment"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <CheckCheck size={17} strokeWidth={2} />
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() =>
                        handleAppointmentStatus(item._id, "cancelled")
                      }
                      title="Cancel appointment"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      <X size={17} strokeWidth={2} />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Confirm */}
                    <button
                      onClick={() =>
                        handleAppointmentStatus(item._id, "confirmed")
                      }
                      title="Confirm appointment"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-green-200 bg-white text-green-600 transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                    >
                      <Check size={17} strokeWidth={2} />
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() =>
                        handleAppointmentStatus(item._id, "cancelled")
                      }
                      title="Cancel appointment"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      <X size={17} strokeWidth={2} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center sm:py-20">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <CalendarDays size={25} className="text-indigo-500" />
            </div>

            <h3 className="text-sm font-semibold text-gray-700">
              No appointments yet
            </h3>

            <p className="mt-1 max-w-sm text-xs text-gray-500">
              No patient appointments have been scheduled yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
