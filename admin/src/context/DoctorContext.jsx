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
  const [appointments, setAppointments] = useState([])


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
  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getDoctorAppointments
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
