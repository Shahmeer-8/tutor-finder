import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Headphones,
  Clock,
  MessageCircle,
  Globe,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="max-w-[1440px] px-6 lg:px-12 mx-auto py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Side: Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-4 text-deep">Get in Touch</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Have a question, feedback, or just want to say hello? Fill out the
            form and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-deep"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-deep"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-deep"
                placeholder="Your message..."
              ></textarea>
            </div>

            <Button
              variant="secondary"
              type="submit"
              className="px-6 py-2 rounded-md hover:bg-deep hover:text-white cursor-pointer transition-colors"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-3xl font-semibold mb-4 text-deep">
            Contact Details
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We're here to help! Reach out through any of the following ways and
            we'll get back to you.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-deep mt-1" />
              <div>
                <p className="font-medium text-gray-800">Location</p>
                <p className="text-gray-600">Faisalabad, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-deep mt-1" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600">support@tutorfinder.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-deep mt-1" />
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-600">+92 300 1234567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-deep mt-1" />
              <div>
                <p className="font-medium text-gray-800">Website</p>
                <p className="text-gray-600">www.tutorfinder.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Headphones className="w-6 h-6 text-deep mt-1" />
              <div>
                <p className="font-medium text-gray-800">Support</p>
                <p className="text-gray-600">24 / 7 support is available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
