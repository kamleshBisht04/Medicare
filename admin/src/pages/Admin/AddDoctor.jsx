import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import Input from "../../components/Input";
import { exportxperience, specialities } from "../../data/specialities";
import useAdmin from "../../hooks/useAdmin";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const initalData = {
  name: "",
  email: "",
  password: "",
  degree: "",
  experience: "",
  fees: "",
  speciality: "",
  about: "",
  street: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
};

const AddDoctor = () => {
  const [formData, setFormData] = useState(initalData);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { aToken, backendUrl } = useAdmin();
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if(!image){
        return toast.error("Image not selected !")
      }
      
      const newDoctorData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        newDoctorData.append(key, formData[key]);
      });

      // Add image
      if (image) {
        newDoctorData.append("image", image);
      }

      // // Check FormData
      // newDoctorData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        newDoctorData,
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setFormData(initalData);
        setImage(null);
        setImagePreview("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Add doctor error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding doctor",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="mt-20 mb-8 w-full px-[72px] sm:px-6 md:px-10 lg:px-16"
      >
        {/* Page Heading */}
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Add Doctor
        </h2>

        {/* Main Form Card */}
        <div className="w-full max-w-5xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          {/* Doctor Image */}
          <div className="mb-8 flex items-center gap-4">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                className="h-20 w-20 rounded-full border border-gray-200 bg-gray-50 object-cover p-1 transition hover:opacity-80"
                src={imagePreview || assets.upload_area}
                alt="Upload doctor"
              />
            </label>

            <div>
              <p className="text-sm font-medium text-gray-700">
                Upload Doctor Picture
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Doctor profile picture
              </p>
            </div>

            <input
              type="file"
              id="doc-img"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Doctor Information */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {/* Doctor Name */}
            <Input
              label="Doctor Name"
              name="name"
              placeholder="Dr. Full Name"
              value={formData.name}
              onChange={onChange}
              required
            />

            {/* Speciality */}
            <Input
              label="Speciality"
              name="speciality"
              placeholder="Select speciality"
              select
              options={specialities}
              value={formData.speciality}
              onChange={onChange}
              required
            />

            {/* Email */}
            <Input
              label="Doctor Email"
              type="email"
              name="email"
              placeholder="Enter doctor email"
              value={formData.email}
              onChange={onChange}
              required
            />

            {/* Education */}
            <Input
              label="Education"
              type="text"
              name="degree"
              placeholder="e.g. MBBS, MD, MS"
              value={formData.degree}
              onChange={onChange}
              required
            />

            {/* Password */}
            <Input
              label="Doctor Password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={onChange}
              required
            />

            {/* Experience */}
            <Input
              label="Experience"
              name="experience"
              placeholder="Select experience"
              select
              options={exportxperience}
              value={formData.experience}
              onChange={onChange}
              required
            />

            {/* Consultation Fee */}
            <Input
              label="Consultation Fee"
              type="number"
              name="fees"
              placeholder="Enter consultation fee"
              value={formData.fees}
              onChange={onChange}
              required
            />
          </div>

          {/* Address Section */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3 className="mb-4 text-base font-semibold text-gray-800">
              Doctor Address
            </h3>

            <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              {/* Street / Full Address */}
              <div className="md:col-span-2">
                <Input
                  label="Street / Address"
                  type="text"
                  name="street"
                  placeholder="House no, Street, Apartment, Floor, Landmark"
                  value={formData.street}
                  onChange={onChange}
                  required
                />
              </div>

              {/* City */}
              <Input
                label="City"
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={onChange}
                required
              />

              {/* State */}
              <Input
                label="State"
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={onChange}
                required
              />

              {/* District */}
              <Input
                label="District"
                type="text"
                name="district"
                placeholder="Enter district"
                value={formData.district}
                onChange={onChange}
                required
              />

              {/* Pincode */}
              <Input
                label="Pincode"
                type="number"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* About Doctor */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <Input
              label="About Doctor"
              name="about"
              placeholder="Write something about the doctor..."
              value={formData.about}
              onChange={onChange}
              textarea
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary mt-6 rounded-full px-7 py-2.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-95"
            disabled={loading}
            onClick={() => scrollTo(0, 0)}
          >
            {loading ? "Adding Doctor..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
