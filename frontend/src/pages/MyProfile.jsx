import { useState } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import { assets } from '../assets/assets';
import Input from '../components/Input';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+91 9876543210',
    address: 'New Delhi, India',
    gender: 'Male',
    dob: '2000-01-01',
    bloodGroup: 'B+',
    emergency: '+91 9999999999',
    weight: '72 Kg',
    height: '5.9 ft',
    allergies: 'Dust Allergy',
    medicalHistory: 'Diabetes',
    city: 'Delhi',
    pincode: '110025',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEdit(false);
    console.log(userData);
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        {/* Top Section */}
        <div className="gradient-banner flex flex-col gap-6 border-b-1 border-gray-200 px-10 py-6 pb-8 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="flex flex-col items-center gap-5 md:flex-row">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={assets.profile_pic}
                alt="profile"
                className="h-28 w-28 rounded-full border-6 border-gray-200 object-cover"
              />
              {isEdit && (
                <label className="bg-primary absolute right-0 bottom-0 cursor-pointer rounded-full p-2 text-white shadow-md">
                  <Camera className="h-4 w-4" />
                  <input type="file" hidden accept="image/*" />
                </label>
              )}
            </div>
            {/* Name */}
            <div className="text-center md:text-left">
              {isEdit ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="rounded-lg border border-white px-4 py-2 text-2xl font-semibold text-white outline-none"
                />
              ) : (
                <h1 className="text-3xl font-bold text-white">
                  {userData.name}
                </h1>
              )}
              <p className="mt-1 text-sm text-white">
                Patient Profile Information
              </p>
            </div>
          </div>
          {/* Button */}
          <button
            onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
            className="bg-white flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-primary transition-all hover:opacity-90"
          >
            {isEdit ? (
              <>
                <Save className="h-4 w-4" /> Save Profile
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Form Section */}
        <div className="p-6 md:p-10">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your personal and medical details
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid gap-6 gap-x-12 md:grid-cols-3">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="City"
              name="city"
              value={userData.city}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Pincode"
              name="pincode"
              value={userData.pincode}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              disabled={!isEdit}
              select={true}
              options={['Male', 'Female', 'Other']}
            />

            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Blood Group"
              name="bloodGroup"
              value={userData.bloodGroup}
              onChange={handleChange}
              disabled={!isEdit}
              select={true}
              options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            />

            <Input
              label="Height"
              name="height"
              value={userData.height}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Weight"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Emergency Contact"
              name="emergency"
              value={userData.emergency}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <Input
              label="Allergies"
              name="allergies"
              value={userData.allergies}
              onChange={handleChange}
              disabled={!isEdit}
            />

            <div className="md:col-span-2">
              <Input
                label="Medical History"
                name="medicalHistory"
                value={userData.medicalHistory}
                onChange={handleChange}
                disabled={!isEdit}
                textarea={true}
                rows={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
