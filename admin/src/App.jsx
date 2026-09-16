import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAdmin from "@/hooks/useAdmin";
import useADoctor from "./hooks/useDoctor";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Admin/Dashboard";
import AllApointment from "@/pages/Admin/AllApointment";
import DoctorsList from "@/pages/Admin/DoctorsList";
import AddDoctor from "@/pages/Admin/AddDoctor";
import DoctorDashboard from "@/pages/Doctor/DoctorDashboard";
import DoctorAppointments from "@/pages/Doctor/DoctorAppointments";
import DoctorProfile from "@/pages/Doctor/DoctorProfile";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const { aToken } = useAdmin();
  const { dToken } = useADoctor();
  // LOGIN
  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer autoClose={2000} />
      </>
    );
  }
  // AUTHENTICATED APP
  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      <ScrollToTop />
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="min-h-screen w-full flex-1 pt-6 md:ml-60">
          {/* ADMIN ROUTES */}
          {aToken && (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllApointment />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </Routes>
          )}
          {/* DOCTOR ROUTES */}
          {dToken && (
            <Routes>
              <Route path="/" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
