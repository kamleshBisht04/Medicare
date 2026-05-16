import { useState } from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white px-4 py-10 md:px-10 lg:px-20">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Contact <span className="text-primary">Us</span>
        </h1>

        <p className="mt-4 text-gray-500">We are here to help you anytime.</p>
      </div>

      {/* Contact Section */}
      <div className="mx-auto max-w-7xl rounded-3xl bg-gray-50 p-8 shadow-sm">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img
              className="rounded-xl"
              src={assets.contact_image}
              alt="contact section"
            />
          </div>
          {/* Left Side */}
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>

              <p className="mt-1 text-gray-500">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>

              <p className="mt-1 text-gray-500">support@medicare.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">Address</h3>

              <p className="mt-1 text-gray-500">New Delhi, India</p>
            </div>
          </div>

          {/* Right Side */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="focus:border-primary w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="focus:border-primary w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
              required
            />

            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="focus:border-primary w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-primary rounded-xl px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
