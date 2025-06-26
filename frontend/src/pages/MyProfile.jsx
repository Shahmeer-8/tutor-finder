import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-toastify";
const MyProfile = () => {
  // Dummy user data  // I'll replace it with context data
  const initialUser = {
    pic: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Ayesha Khan",
    email: "ayesha.khan@example.com",
    phone: "+92 300 1234567",
    dob: "1995-08-15",
    gender: "Female",
    city: "Faisalabad",
    country: "Pakistan",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pic" && files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setUser((prev) => ({ ...prev, pic: imageUrl }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // On update/save
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <section className="py-28 mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Profile picture + name/email */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-36 h-36">
          <img
            src={user.pic}
            alt="Profile"
            className="w-full h-full object-cover rounded-md border border-gray-300"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              name="pic"
              onChange={handleChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              title="Change Profile Picture"
            />
          )}
        </div>

        <div className="flex-1">
          {!isEditing ? (
            <>
              <h1 className="text-3xl font-semibold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4 w-full">
              <div>
                <label className="block font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </form>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Personal Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-medium">Name</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="font-medium">Date of Birth</p>
              <p>{user.dob}</p>
            </div>
            <div>
              <p className="font-medium">Gender</p>
              <p>{user.gender}</p>
            </div>
            <div>
              <p className="font-medium">City</p>
              <p>{user.city}</p>
            </div>
            <div>
              <p className="font-medium">Country</p>
              <p>{user.country}</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={user.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </form>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6">
        {!isEditing ? (
          <Button
            onClick={toggleEdit}
            className="px-6 py-2 bg-deep text-white rounded-md cursor-pointer hover:bg-deep/90 transition"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-4 ">
            <Button
              onClick={handleUpdate}
              className="px-6 py-2 bg-green-600 cursor-pointer text-white rounded-md hover:bg-green-700 transition"
              type="submit"
            >
              Update
            </Button>
            <Button
              onClick={toggleEdit}
              className="px-6 py-2 bg-gray-300 cursor-pointer text-gray-600 rounded-md hover:bg-gray-400 transition"
              type="button"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default MyProfile;
