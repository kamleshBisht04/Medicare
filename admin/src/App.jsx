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
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className=" w-full min-h-screen flex-1 pt-6 sm:ml-64">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllApointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
          </Routes>
        </main>
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
