import { useState } from "react";

const AddTutor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    city: "",
    country: "",
    qualification: "",
    subject: "",
    experience: "",
    fee: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow"
      >
        {/* Column 1 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">About</label>
            <textarea
              name="about"
              rows="3"
              placeholder="Brief description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.about}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-deep mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-deep mb-1">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep mb-1">Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Highest qualification"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject(s) taught"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="Years of experience"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">Fee</label>
            <input
              type="text"
              name="fee"
              placeholder="Hourly fee"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep"
              value={formData.fee}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep mb-1">Profile Image</label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className="cursor-pointer w-24 h-24 border-2 border-dashed border-deep rounded-md flex items-center justify-center overflow-hidden bg-gray-200 hover:bg-gray-100 transition"
                title="Click to upload profile image"
              >
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Profile Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-deep text-sm">Upload Image</span>
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2 text-center pt-4">
          <button
            type="submit"
            className="bg-deep cursor-pointer text-white px-6 py-2 rounded-md hover:bg-deep/80 transition"
          >
            Add Tutor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutor;
