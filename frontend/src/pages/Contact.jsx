
import { useState } from "react"
import { Mail, MapPin, Phone, Headphones, Globe, Facebook, Twitter, Instagram, Linkedin, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Message sent successfully!")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-deep to-slate-900">
  

      <div className="relative z-10 max-w-[1440px] px-6 lg:px-12 mx-auto py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-primary">Feel free to get in touch</h1>
          <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed">
            We're here to help! Have a question, feedback, or just want to say hello? We'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Side: Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-deep font-secondary">Get in Touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have a question, feedback, or just want to say hello? Fill out the form and we'll get back to you as soon
              as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-medium text-deep mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium text-deep mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-medium text-deep mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="privacy" className="rounded" required />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  I agree to the privacy policy
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-deep hover:bg-deep/90 cursor-pointer text-white py-3 rounded-lg font-medium transition-colors"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Don't hesitate to contact us</h3>
              <p className="text-blue-200 mb-8 leading-relaxed">
                We're here to help! Reach out through any of the following ways and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold">Location</h4>
                </div>
                <p className="text-blue-200 text-sm">Faisalabad, Pakistan</p>
              </div>

              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold">Phone</h4>
                </div>
                <p className="text-blue-200 text-sm">+92 300 1234567</p>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold">Email</h4>
                </div>
                <p className="text-blue-200 text-sm">support@tutorfinder.com</p>
              </div>

              {/* Support */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-pink-500 p-2 rounded-lg">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold">Support</h4>
                </div>
                <p className="text-blue-200 text-sm">24/7 support available</p>
              </div>

              {/* Website */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white md:col-span-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold">Website</h4>
                </div>
                <p className="text-blue-200 text-sm">www.tutorfinder.com</p>
              </div>
            </div>

           
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
