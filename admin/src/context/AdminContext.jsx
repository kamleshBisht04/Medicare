/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/doctor-list", {
        headers: {
          aToken,
        },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleAvailability = async (id, currentAvailability) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        {
          id,
          available: !currentAvailability,
        },
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        getAllDoctors();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/all-appointments",
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-appointment-status`,
        {
          appointmentId,
          status,
        },
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        // Appointment list refresh
        await getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          aToken,
        },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    handleAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    updateAppointmentStatus,
    dashData,
    getDashboardData,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
