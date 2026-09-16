import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Save,
  UserRound,
  Mail,
  MapPin,
  GraduationCap,
  BriefcaseMedical,
  IndianRupee,
  CalendarDays,
  CircleCheck,
  Pencil,
} from "lucide-react";

import useDoctor from "@/hooks/useDoctor";
import Input from "@/components/Input";

const initialData = {
  name: "",
  email: "",
  speciality: "",
  degree: "",
  experience: "",
  fees: "",
  about: "",
  street: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
};

const DoctorProfile = () => {
  const { dToken, getDoctorProfile, doctorData, updateDoctorProfile } =
    useDoctor();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        email: doctorData.email || "",
        speciality: doctorData.speciality || "",
        degree: doctorData.degree || "",
        experience: doctorData.experience || "",
        fees: doctorData.fees || "",
        about: doctorData.about || "",
        street: doctorData.address?.street || "",
        city: doctorData.address?.city || "",
        district: doctorData.address?.district || "",
        state: doctorData.address?.state || "",
        pincode: doctorData.address?.pincode || "",
      });
    }
  }, [doctorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        email: doctorData.email || "",
        speciality: doctorData.speciality || "",
        degree: doctorData.degree || "",
        experience: doctorData.experience || "",
        fees: doctorData.fees || "",
        about: doctorData.about || "",
        street: doctorData.address?.street || "",
        city: doctorData.address?.city || "",
        district: doctorData.address?.district || "",
        state: doctorData.address?.state || "",
        pincode: doctorData.address?.pincode || "",
      });
    }

    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      email: formData.email,
      speciality: formData.speciality,
      degree: formData.degree,
      experience: formData.experience,
      fees: Number(formData.fees),
      about: formData.about,

      address: {
        street: formData.street,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    const success = await updateDoctorProfile(updatedData);

    if (success) {
      setIsEditing(false);
      await getDoctorProfile();
    }
  };

  return (
    <div className="mt-12 min-h-screen w-full bg-[#f8fafc] p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {isEditing
                ? "Update your professional information"
                : "View and manage your professional information"}
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#4338CA] hover:shadow-md active:scale-[0.98]"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </button>
          )}
        </div>

        {/* ================= EDIT FORM ================= */}
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            {/* Form Header */}
            <div className="border-b border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-white px-5 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                  <Pencil className="h-5 w-5 text-[#4F46E5]" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Edit Profile
                  </h2>

                  <p className="mt-0.5 text-sm text-gray-500">
                    Update your professional and clinic information
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 p-5 sm:p-8">
              {/* Personal Information */}
              <section>
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Basic information about you
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter doctor name"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />

                  <Input
                    label="Speciality"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    placeholder="e.g. General Physician"
                    required
                  />

                  <Input
                    label="Qualification"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. MBBS, MS"
                    required
                  />
                </div>
              </section>

              {/* Professional Information */}
              <section className="border-t border-gray-100 pt-8">
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-gray-900">
                    Professional Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Your experience and consultation details
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="Experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5 Years"
                    required
                  />

                  <Input
                    label="Consultation Fee"
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="Enter consultation fee"
                    required
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="About Doctor"
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="Write something about your professional experience..."
                      textarea
                      rows={6}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Clinic Address */}
              <section className="border-t border-gray-100 pt-8">
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-gray-900">
                    Clinic Address
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Update your registered clinic location
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Input
                    label="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    required
                  />

                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />

                  <Input
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter district"
                    required
                  />

                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />

                  <Input
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
              </section>
            </div>

            {/* Form Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/50 px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4338CA] active:scale-[0.98]"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* ================= PROFILE VIEW ================= */
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Profile Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-white p-5 sm:p-8">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-100/60" />

              <div className="absolute right-20 -bottom-20 h-32 w-32 rounded-full bg-indigo-50/70" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Doctor Image */}
                <div className="relative mx-auto shrink-0 sm:mx-0">
                  <div className="rounded-2xl bg-white p-1.5 shadow-md">
                    <img
                      src={doctorData?.image}
                      alt={doctorData?.name || "Doctor"}
                      className="h-28 w-28 rounded-xl object-cover sm:h-36 sm:w-36"
                    />
                  </div>

                  {doctorData?.available && (
                    <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border-2 border-white bg-green-500 px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-white shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Available
                    </span>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {doctorData?.name || "Doctor Name"}
                    </h2>

                    {doctorData?.available && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        <CircleCheck className="h-3.5 w-3.5" />
                        Active
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[#4F46E5]">
                    {doctorData?.speciality || "Speciality"}
                  </p>

                  <div className="mt-4 flex flex-col items-center gap-2 text-sm text-gray-500 sm:items-start">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="break-all">
                        {doctorData?.email || "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-gray-400" />
                      <span>{doctorData?.degree || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="p-5 sm:p-8">
              <div className="mb-5">
                <h3 className="text-base font-semibold text-gray-900">
                  Professional Information
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Your professional details visible in the system
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Speciality */}
                <div className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <BriefcaseMedical className="h-5 w-5 text-[#4F46E5]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Speciality
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {doctorData?.speciality || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Qualification */}
                <div className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <GraduationCap className="h-5 w-5 text-[#4F46E5]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Qualification
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {doctorData?.degree || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <CalendarDays className="h-5 w-5 text-[#4F46E5]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Experience
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {doctorData?.experience || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <IndianRupee className="h-5 w-5 text-[#4F46E5]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Consultation Fee
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        ₹{doctorData?.fees ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <CircleCheck className="h-5 w-5 text-[#4F46E5]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Availability
                      </p>

                      <p
                        className={`mt-1 truncate text-sm font-semibold ${
                          doctorData?.available
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {doctorData?.available ? "Available" : "Unavailable"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="border-t border-gray-100 p-5 sm:p-8">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">
                  About Doctor
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Professional introduction and areas of expertise
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5">
                <p className="text-sm leading-7 text-gray-600">
                  {doctorData?.about || "No information available."}
                </p>
              </div>
            </div>

            {/* Clinic Address */}
            <div className="border-t border-gray-100 p-5 sm:p-8">
              <div className="mb-5">
                <h3 className="text-base font-semibold text-gray-900">
                  Clinic Address
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Registered clinic and practice location
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                    <MapPin className="h-5 w-5 text-[#4F46E5]" />
                  </div>

                  <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Street
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-gray-800">
                        {doctorData?.address?.street || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">City</p>

                      <p className="mt-1.5 text-sm font-semibold text-gray-800">
                        {doctorData?.address?.city || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        District
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-gray-800">
                        {doctorData?.address?.district || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">State</p>

                      <p className="mt-1.5 text-sm font-semibold text-gray-800">
                        {doctorData?.address?.state || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Pincode
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-gray-800">
                        {doctorData?.address?.pincode || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/50 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />

                <span>
                  Created{" "}
                  {doctorData?.createdAt
                    ? new Date(doctorData.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )
                    : "—"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />

                <span>
                  Updated{" "}
                  {doctorData?.updatedAt
                    ? new Date(doctorData.updatedAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
