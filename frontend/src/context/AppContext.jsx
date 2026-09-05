/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctorsData = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/doctor/list");

        if (data.success) {
          setDoctors(data.doctors);
        } else {
          toast.error(data.message || "Failed to fetch doctors");
        }
      } catch (error) {
        console.log("Error fetching doctors:", error);

        toast.error(error.response?.data?.message || "Unable to fetch doctors");
      }
    };

    if (backendUrl) {
      getDoctorsData();
    }
  }, [backendUrl]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
