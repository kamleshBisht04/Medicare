import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

const useADoctor = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("useAdmin must be used inside AdminContextProvider");
  }

  return context;
};

export default useADoctor;
