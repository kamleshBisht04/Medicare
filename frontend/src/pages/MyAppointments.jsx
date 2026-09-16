/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

import { useAppContext } from "../hooks/useAppContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  CalendarDays,
  Clock,
  MapPin,
  CreditCard,
  X,
  CircleCheck,
} from "lucide-react";
import { formatSlotDate } from "../data/formatDate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useAppContext();

  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  // GET USER APPOINTMENTS

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/get-appointments",
        {
          headers: { token },
        },
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setAppointments(data.appointments);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  // RAZORPAY PAYMENT

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Medicare",
      description: "Doctor Appointment",
      order_id: order.id,

      handler: async (response) => {
        console.log("SUCCESS RESPONSE:", response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/payment-razorpay/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: { token },
            },
          );

          if (!data.success) {
            toast.error(data.message);
            return;
          }

          toast.success("Payment successful");

          await getUserAppointments();

          navigate("/my-appointments");
        } catch (error) {
          console.error("VERIFY PAYMENT ERROR:", error);

          toast.error(
            error.response?.data?.message || "Payment verification failed",
          );
        }
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response) => {
      toast.error(response.error?.description || "Payment failed");
    });

    razorpay.on("modal.ondismiss", () => {
      console.log("Razorpay checkout closed");
    });

    razorpay.open();
  };

  // CREATE PAYMENT ORDER

  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/payment-razorpay/create-order",
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      initPay(data.order);
    } catch (error) {
      console.error("CREATE PAYMENT ERROR:", error);

      toast.error(
        error.response?.data?.message || "Unable to create payment order",
      );
    }
  };

  // CANCEL APPOINTMENT

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      // Immediately update frontend
      setAppointments((prevAppointments) =>
        prevAppointments.map((item) =>
          item._id === appointmentId
            ? {
                ...item,
                status: "cancelled",
                cancelled: true,
              }
            : item,
        ),
      );

      // Update doctor slots
      getDoctorsData();

      // Refresh appointments
      await getUserAppointments();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // STATUS HELPERS

  const getStatusLabel = (status) => {
    const statusLabels = {
      cancelled: "Cancelled",
      completed: "Completed",
      confirmed: "Confirmed",
      pending: "Pending",
    };

    return statusLabels[status] || "Pending";
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      cancelled: "bg-red-50 text-red-600",
      completed: "bg-blue-50 text-blue-600",
      confirmed: "bg-green-50 text-green-600",
      pending: "bg-amber-50 text-amber-600",
    };

    return statusClasses[status] || statusClasses.pending;
  };

  // GET APPOINTMENTS ON LOAD
  // ==========================================

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      {/* HEADING */}
      <p className="mt-10 border-b border-gray-200 pb-3 text-2xl font-medium text-zinc-700">
        My appointments
      </p>

      {/* TOP STATUS BAR */}
      <div className="border-t border-zinc-100 px-5 py-3">
        <p className="inline-block rounded-2xl bg-green-600 px-4 py-1 text-xs text-white">
          Please arrive 10–15 minutes before your appointment time.
        </p>
      </div>

      {/* APPOINTMENT LIST */}
      <div className="mt-2">
        {appointments.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-10">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
                <CalendarDays className="h-10 w-10 text-indigo-500" />
              </div>

              <h2 className="text-xl font-semibold text-zinc-800">
                No appointments yet
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                You don't have any appointments at the moment. Book an
                appointment with one of our doctors to get started.
              </p>

              <button
                onClick={() => navigate("/doctors")}
                className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-700"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        ) : (
          /* APPOINTMENT CARDS */
          appointments.map((item) => {
            const { _id, status, payment, slotDate, slotTime, docData } = item;

            const isCancelled = status === "cancelled";
            const isCompleted = status === "completed";
            const isConfirmed = status === "confirmed";
            const isPending = status === "pending";

            const canCancel = isPending || isConfirmed;

            const canPay = !payment && !isCancelled && !isCompleted;

            return (
              <div
                key={_id}
                className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xs sm:p-5"
              >
                <div className="grid grid-cols-[auto_1fr] gap-4 sm:flex sm:gap-6">
                  {/* DOCTOR IMAGE */}
                  <div className="shrink-0">
                    <img
                      className="h-28 w-28 rounded-xl bg-indigo-50 object-cover sm:h-32 sm:w-32"
                      src={docData.image}
                      alt={docData.name}
                    />
                  </div>

                  {/* DOCTOR DETAILS */}
                  <div className="flex-1 text-sm text-zinc-600">
                    {/* NAME + STATUS */}
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-semibold text-zinc-800">
                        {docData.name}
                      </p>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                          status,
                        )}`}
                      >
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    {/* SPECIALITY */}
                    <p className="mt-1 font-medium text-indigo-600">
                      {docData.speciality}
                    </p>

                    {/* ADDRESS */}
                    <div className="mt-3 flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                      <div>
                        <p className="text-xs font-medium text-zinc-700">
                          Address
                        </p>

                        <p className="text-xs text-zinc-500">
                          {docData.address.street}, {docData.address.city}
                        </p>
                      </div>
                    </div>

                    {/* DATE + TIME */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      {/* DATE */}
                      <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                        <CalendarDays className="h-4 w-4 text-indigo-500" />

                        <div>
                          <p className="text-[10px] text-zinc-400 uppercase">
                            Date
                          </p>

                          <p className="text-xs font-medium text-zinc-700">
                            {formatSlotDate(slotDate)}
                          </p>
                        </div>
                      </div>

                      {/* TIME */}
                      <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                        <Clock className="h-4 w-4 text-indigo-500" />

                        <div>
                          <p className="text-[10px] text-zinc-400 uppercase">
                            Time
                          </p>

                          <p className="text-xs font-medium text-zinc-700">
                            {slotTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="col-span-2 flex flex-col justify-end gap-2 sm:w-52">
                    {/* PAID */}
                    {payment && !isCancelled && (
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-green-600 px-1 py-2 text-sm text-white transition-all duration-300"
                      >
                        <CircleCheck className="h-4 w-4" />
                        Paid
                      </button>
                    )}

                    {/* PAY ONLINE */}
                    {canPay && (
                      <button
                        onClick={() => handlePayment(_id)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-indigo-500 px-4 py-2 text-sm text-indigo-600 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay Online
                      </button>
                    )}

                    {/* CANCEL APPOINTMENT */}
                    {canCancel && (
                      <button
                        onClick={() => cancelAppointment(_id)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm whitespace-nowrap text-zinc-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                        Cancel appointment
                      </button>
                    )}

                    {/* CANCELLED */}
                    {isCancelled && (
                      <button
                        disabled
                        className="flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm whitespace-nowrap text-red-400 transition-all duration-300"
                      >
                        <X className="h-4 w-4" />
                        Cancelled
                      </button>
                    )}

                    {/* COMPLETED */}
                    {isCompleted && (
                      <button
                        disabled
                        className="flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-blue-400 px-4 py-2 text-sm whitespace-nowrap text-blue-400 transition-all duration-300"
                      >
                        <CircleCheck className="h-4 w-4" />
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
