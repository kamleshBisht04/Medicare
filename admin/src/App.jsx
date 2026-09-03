import Login from "@/pages/Login";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import useAdmin from "@/hooks/useAdmin";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/pages/Admin/Dashboard";
import AllApointment from "@/pages/Admin/AllApointment";
import DoctorsList from "@/pages/Admin/DoctorsList";
import AddDoctor from "@/pages/Admin/AddDoctor";

const App = () => {
  const { aToken } = useAdmin();
  return aToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllApointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
