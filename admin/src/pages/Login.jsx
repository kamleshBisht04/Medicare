import { useState } from "react";
import Input from "@/components/Input";
import { assets } from "@/assets/assets";
import axios from "axios";
import useAdmin from "@/hooks/useAdmin";
import { toast } from "react-toastify";

const initialData = {
  email: "",
  password: "",
};
const Login = () => {
  const [state, setstate] = useState("Admin");
  const [formData, setFormData] = useState(initialData);
  const { setAToken, backendUrl } = useAdmin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email: formData.email,
          password: formData.password,
        });
        if (data.success) {
          console.log(data);
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error.response?.data);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mt-8 flex min-h-[80vh] items-center justify-center px-4"
    >
      <div className="w-full max-w-[390px] rounded-xl border border-gray-200 bg-white p-8 text-sm shadow-sm">
        <p className="mb-2 text-center text-2xl font-semibold text-gray-800">
          <span className="text-primary/80 capitalize">{state}</span> Login
        </p>
        <div className="space-y-1">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />

          <div className="my-2 text-right">
            <button
              type="button"
              className="text-primary text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="bg-primary/90 mt-2 mb-5 w-full rounded-md py-2 text-base font-medium text-white transition hover:opacity-90"
          >
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setstate("Doctor")}
                className="text-primary cursor-pointer underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setstate("Admin")}
                className="text-primary cursor-pointer underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
        <div className="mt-2 flex items-start justify-end">
          <img
            src={assets.admin_logo}
            className="w-40"
            alt="dashboard brand logo"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
