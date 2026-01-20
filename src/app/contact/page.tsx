"use client";

import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Header from '../../components/navbar';
import Footer from '../../components/footer';

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/send_mail", {
        method: "POST",
        body: formData, 
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        e.currentTarget.reset();
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-8">
        {/* Hero Section */}
        <section className="w-full py-16 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Let's Talk About Your Project
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-primary">
            Ready to bring your vision to life? We’d love to hear about your project and
            explore how we can help you achieve your goals.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <div className="bg-[#F7EDFE] rounded-2xl border-[#E5E7EB] p-8">
              <h2 className="text-xl font-semibold text-primary mb-2">Send us a message</h2>
              <p className="text-secondary mb-6">
                Fill out the form below and we’ll get back to you within 24 hours.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-primary ml-2">Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className="text-primary border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-primary ml-2">Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="text-primary border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-primary ml-2">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Your company name"
                    className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="projectType" className="text-primary ml-2">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select project type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI / UX Design">UI / UX Design</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="budget" className="text-primary ml-2">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-20k">$10k - $20k</option>
                    <option value="20k+">$20k+</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="timeline" className="text-primary ml-2">Time Line</label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-3 Months">1 - 3 Months</option>
                    <option value="3-6 Months">3 - 6 Months</option>
                    <option value="6-9 Months">6 - 9 Months</option>
                  </select>
                </div>

                {/* Project Detail */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="projectDetail" className="text-primary ml-2">Project Detail *</label>
                  <textarea
                    id="projectDetail"
                    name="projectDetail"
                    rows={4}
                    required
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    className="text-secondary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">File Upload</p>
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center text-sm relative cursor-pointer hover:bg-[#FBF7FE] transition">
                    <input
                      type="file"
                      name="file" 
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-secondary flex flex-col justify-center items-center pointer-events-none">
                      <IoMdCloudUpload className="text-4xl text-primary" />
                      Drop files here or click to upload <br /> PDF, DOC, PNG up to 10MB
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-primary">
                    I agree to the processing of my personal data in accordance with the{" "}
                    <Link href="/privacy-policy" className="text-secondary underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to receive communications about this inquiry.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8145B5] text-white py-2 rounded-md hover:bg-purple-700 hover:shadow-2xl shadow-[#8145B5] transition disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {status && <p className="mt-2 text-center text-primary font-medium">{status}</p>}
              </form>
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              <div className="bg-[#F7EDFE] border-[#EAD5F9] rounded-2xl p-8 text-center">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Schedule a call
                </h2>
                <p className="text-secondary mb-4">
                  Prefer to talk? Book a free 30-minute consultation call with our team
                </p>
                <div className="bg-[#FBF7FE] flex flex-col items-center justify-center py-10 rounded-xl">
                   {/* Simplified visual for layout */}
                  <MdCalendarToday className="text-primary text-5xl mb-4" />
                  <p className="text-primary font-bold text-xl mb-4">Calendly</p>
                  <button className="bg-[#8145B5] text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition">
                    Book a Call
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#F7EDFE] rounded-2xl border-[#E5E7EB] p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary">Get in touch</h3>

                <div className="flex items-center gap-3">
                  <Mail className="text-secondary" />
                  <a href="mailto:info@devisgon.com" className="text-secondary hover:underline">
                    info@devisgon.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-secondary" />
                  <a href="tel:+923316944411" className="text-secondary hover:underline">
                    +92 331 6944411
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-secondary" />
                  {/* Fixed Google Maps Link */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Okara,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline"
                  >
                    Okara, Pakistan
                  </a>
                </div>

                <div className="flex flex-row gap-4 justify-start p-4">
                  <div className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-secondary text-3xl transition-transform duration-1200 ease-in-out hover:rotate-360 cursor-pointer">
                    <a href="https://www.facebook.com/Devisgon/" target="_blank">
                      <FaSquareFacebook />
                    </a>
                  </div>
                  <div className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-secondary text-3xl transition-transform duration-1200 ease-in-out hover:rotate-360 cursor-pointer">
                    <a href="https://www.linkedin.com/company/devisgon/" target="_blank">
                      <IoLogoLinkedin />
                    </a>
                  </div>
                  <div className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-secondary text-3xl transition-transform duration-1200 ease-in-out hover:rotate-360 cursor-pointer">
                    <a href="https://www.instagram.com/devisgon" target="_blank">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}