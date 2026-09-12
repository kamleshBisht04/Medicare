/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useAppContext } from "../hooks/useAppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CalendarDays, Clock, MapPin, CreditCard, X } from "lucide-react";
import { formatSlotDate } from "../data/formatDate";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useAppContext();
  const [appointments, setAppointments] = useState([]);

  //  to get all appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/get-appointments",
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Initialize Razorpay payment
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
              headers: {
                token,
              },
            },
          );

          if (data.success) {
            toast.success("Payment successful");

            // appointments ko refresh karo
            getUserAppointments();
            
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("VERIFY PAYMENT ERROR:", error);
          toast.error(
            error.response?.data?.message || "Payment verification failed",
          );
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response) => {
      toast.error(response.error?.description || "Payment failed");
    });

    rzp.on("modal.ondismiss", () => {
      console.log("Razorpay checkout closed");
    });

    rzp.open();
  };
  // Handle the payment
  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/payment-razorpay/create-order",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        // Order mil gaya, ab Razorpay checkout open karo
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Unable to create payment order",
      );
    }
  };

  // cancel the appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      {/* Heading */}
      <p className="mt-10 border-b border-gray-200 pb-3 text-2xl font-medium text-zinc-700">
        My appointments
      </p>

      {/* Top Status Bar */}
      <div className="border-t border-zinc-100 px-5 py-3">
        <p className="inline-block rounded-2xl bg-green-600 px-4 py-1 text-xs text-white">
          Please arrive 10–15 minutes before your appointment time.
        </p>
      </div>

      {/* Appointment List */}
      <div className="mt-2">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xs sm:p-5"
          >
            <div className="grid grid-cols-[auto_1fr] gap-4 sm:flex sm:gap-6">
              {/* Doctor Image */}
              <div className="shrink-0">
                <img
                  className="h-28 w-28 rounded-xl bg-indigo-50 object-cover sm:h-32 sm:w-32"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-semibold text-zinc-800">
                    {item.docData.name}
                  </p>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.cancelled ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"} `}
                  >
                    {item.cancelled ? "Cancelled" : "Confirmed"}
                  </span>
                </div>

                <p className="mt-1 font-medium text-indigo-600">
                  {item.docData.speciality}
                </p>

                {/* Address */}
                <div className="mt-3 flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                  <div>
                    <p className="text-xs font-medium text-zinc-700">Address</p>

                    <p className="text-xs text-zinc-500">
                      {item.docData.address.street}, {item.docData.address.city}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                    <CalendarDays className="h-4 w-4 text-indigo-500" />

                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase">
                        Date
                      </p>

                      <p className="text-xs font-medium text-zinc-700">
                        {formatSlotDate(item.slotDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                    <Clock className="h-4 w-4 text-indigo-500" />

                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase">
                        Time
                      </p>

                      <p className="text-xs font-medium text-zinc-700">
                        {item.slotTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex flex-col justify-end gap-2 sm:w-52">
                {!item.cancelled && (
                  <button
                    onClick={() => handlePayment(item._id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-indigo-500 px-4 py-2 text-sm text-indigo-600 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay Online
                  </button>
                )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm whitespace-nowrap text-zinc-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                    Cancel appointment
                  </button>
                )}
                {item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm whitespace-nowrap text-red-400 transition-all duration-300 hover:border-red-400"
                  >
                    <X className="h-4 w-4" />
                    Cancel appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Status Bar */}
      </div>
    </div>
  );
};

export default MyAppointments;
