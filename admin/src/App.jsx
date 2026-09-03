import Login from "@/pages/Login";
import { ToastContainer } from "react-toastify";
import useAdmin from "@/hooks/useAdmin";

const App = () => {
  const { aToken } = useAdmin();
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
