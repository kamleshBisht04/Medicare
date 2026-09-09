import { useState } from "react";
import {
  Edit2,
  Save,
  Camera,
  User,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { useAppContext } from "../hooks/useAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../data/formatDate.js";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userData, setUserData, backendUrl, token } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const profileFields = [
        "name",
        "phone",
        "address",
        "city",
        "pincode",
        "gender",
        "dateOfBirth",
        "bloodGroup",
        "height",
        "weight",
        "emergencyContact",
        "allergies",
        "medicalHistory",
      ];

      const formData = new FormData();

      profileFields.forEach((field) => {
        formData.append(field, userData[field] ?? "");
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.put(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        setUserData(data.user);
        setIsEdit(false);
        setImageFile(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    userData && (
      <div className="min-h-screen rounded-2xl bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* ================= HEADER ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 px-6 py-8 shadow-xl md:px-10">
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              {/* Profile */}
              <div className="flex flex-col items-center gap-5 md:flex-row">
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : userData?.image
                    }
                    alt="profile"
                    className="h-32 w-32 rounded-full border-4 border-white/80 object-cover shadow-xl"
                  />

                  {isEdit && (
                    <label className="absolute right-1 bottom-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition hover:scale-105">
                      <Camera className="h-4 w-4" />

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                      />
                    </label>
                  )}
                </div>

                {/* Name */}
                <div className="text-center md:text-left">
                  {isEdit ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name || ""}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-2xl font-bold text-white outline-none placeholder:text-white/60 focus:bg-white/20"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-white">
                      {userData.name}
                    </h1>
                  )}

                  <p className="mt-2 flex items-center justify-center gap-2 text-sm text-blue-100 md:justify-start">
                    <User className="h-4 w-4" />
                    Patient Profile
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-md transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEdit ? (
                  loading ? (
                    <>
                      <Loader />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Profile
                    </>
                  )
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ================= PROFILE CONTENT ================= */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* ================= LEFT CARD ================= */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      Profile Summary
                    </h2>
                    <p className="text-xs text-gray-500">Basic information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="mt-1 text-sm font-medium break-all text-gray-700">
                      {userData.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {userData.phone || "Not added"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {userData.city || "Not added"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-red-50 p-2.5 text-red-500">
                    <HeartPulse className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      Health Overview
                    </h2>
                    <p className="text-xs text-gray-500">
                      Your health information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Blood Group</p>
                    <p className="mt-1 text-lg font-bold text-gray-800">
                      {userData.bloodGroup || "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Gender</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {userData.gender || "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Height</p>
                    <p className="mt-1 text-lg font-bold text-gray-800">
                      {userData.height ? `${userData.height} cm` : "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Weight</p>
                    <p className="mt-1 text-lg font-bold text-gray-800">
                      {userData.weight ? `${userData.weight} kg` : "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
              {/* Personal Information */}
              <div className="mb-7 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your personal details
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  disabled={true}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={userData.phone || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Address"
                  name="address"
                  value={userData.address || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="City"
                  name="city"
                  value={userData.city || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Pincode"
                  name="pincode"
                  value={userData.pincode || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Gender"
                  name="gender"
                  value={userData.gender || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                  select={true}
                  options={["Male", "Female", "Other"]}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formatDate(userData.dateOfBirth) || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Blood Group"
                  name="bloodGroup"
                  value={userData.bloodGroup || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                  select={true}
                  options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                />

                <Input
                  label="Height (cm)"
                  name="height"
                  value={userData.height || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Weight (kg)"
                  name="weight"
                  value={userData.weight || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={userData.emergencyContact || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />

                <Input
                  label="Allergies"
                  name="allergies"
                  value={userData.allergies || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                />
              </div>

              {/* Medical Information */}
              <div className="mt-10 border-t border-gray-100 pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-red-50 p-2.5 text-red-500">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Medical Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Keep your medical history updated
                    </p>
                  </div>
                </div>

                <Input
                  label="Medical History"
                  name="medicalHistory"
                  value={userData.medicalHistory || ""}
                  onChange={handleChange}
                  disabled={!isEdit}
                  textarea={true}
                  rows={5}
                />
              </div>

              {/* Bottom save button */}
              {isEdit && (
                <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
