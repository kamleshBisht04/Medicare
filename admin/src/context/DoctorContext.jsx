/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );
  const [appointments, setAppointments] = useState([]);
  const [doctorData, setDoctorData] = useState(null);
  const [dashData, setDashData] = useState(null);

  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/all-appointments`,
        {
          headers: {
            dToken,
          },
        },
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/doctor/update-appointment-status`,
        {
          appointmentId,
          status,
        },
        {
          headers: {
            dtoken: dToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        // Appointment immediately update
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId
              ? {
                  ...item,
                  status,
                  cancelled: status === "cancelled",
                }
              : item,
          ),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/getDoctor-Profile",
        {
          headers: {
            dToken,
          },
        },
      );

      if (data.success) {
        setDoctorData(data.doctor);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorDashboard = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/doctor/dashboard`,
      {
        headers: {
          dToken,
        },
      }
    );

    if (data.success) {
      setDashData(data.dashboard);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    doctorData,
    setDoctorData,
    getDoctorProfile,
    dashData,
    setDashData,
    getDoctorDashboard,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
