import { assets } from "../../assets/assets";
import Input from "../../components/Input";
import { exportxperience, specialities } from "../../data/specialities";
import useAdmin from "../../hooks/useAdmin";

const AddDoctor = () => {
  const { aToken, backendUrl } = useAdmin();
  return (
    <form className="mt-20 mb-8 w-full px-16 sm:px-10 lg:px-16">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add Doctor</h2>

      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:max-w-5xl sm:p-6 lg:p-8">
        {/* Doctor Image */}
        <div className="mb-8 flex items-center gap-4">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="h-20 w-20 rounded-full border border-gray-200 bg-gray-50 object-cover p-1 transition hover:opacity-80"
              src={assets.upload_area}
              alt="Upload doctor"
            />
          </label>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Upload Doctor Picture
            </p>

            <p className="mt-1 text-xs text-gray-400">Doctor profile picture</p>
          </div>

          <input type="file" id="doc-img" hidden />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
          {/* Doctor Name */}
          <Input
            label="Doctor Name"
            name="name"
            placeholder="Dr. Full Name"
            required
          />

          {/* Speciality */}
          <Input
            label="Speciality"
            name="speciality"
            placeholder="Select speciality"
            select
            options={specialities}
            required
          />

          {/* Email */}
          <Input
            label="Doctor Email"
            type="email"
            name="email"
            placeholder="Enter doctor email"
            required
          />

          {/* Education */}
          <Input
            label="Education"
            type="text"
            name="education"
            placeholder="e.g. MBBS, MD, MS"
            required
          />

          {/* Password */}
          <Input
            label="Doctor Password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
          {/* Address 1 */}
          <Input
            label="Address"
            type="text"
            name="street"
            placeholder="Address 1: Street, Apartment, floor, landmark "
            required
          />
          {/* Experience */}
          <Input
            label="Experience"
            name="experience"
            placeholder="Select experience"
            select
            options={exportxperience}
            required
          />

          {/* Address 2 */}
          <Input
            type="text"
            name="address2"
            placeholder="Address 2: District, State, Pincode "
          />

          {/* Consultation Fee */}
          <Input
            label="Consultation Fee"
            type="number"
            name="fees"
            placeholder="Enter consultation fee"
            required
          />
        </div>

        {/* About Doctor */}
        <div className="mt-4">
          <Input
            label="About Doctor"
            name="about"
            placeholder="Write something about the doctor..."
            textarea
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary mt-6 rounded-full px-7 py-2.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-95"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
