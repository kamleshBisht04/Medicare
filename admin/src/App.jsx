import Login from "@/pages/Login";
import { ToastContainer } from "react-toastify";
import useAdmin from "@/hooks/useAdmin";
import Navbar from "@/components/Navbar";

const App = () => {
  const { aToken } = useAdmin();
  return aToken ? (
    <div >
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
