"use client";

import React, { useState, useRef } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Header from '@/components/navbar';
import Footer from '@/components/footer';
import { motion, Variants } from "framer-motion";

const calendly15 = process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING!;
const calendly30 = process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING!;
const calendly60 = process.env.NEXT_PUBLIC_CALENDLY_60_MIN_MEETING!;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
const [showOptions, setShowOptions] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formRef.current) return;

  setIsSubmitting(true);
  setStatus("");

  const formData = new FormData(formRef.current);
  const jsonData: any = Object.fromEntries(formData.entries());

  // Convert file to base64 if exists
  if (file) {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = (reader.result as string).split(",")[1];
        resolve(result);
      };
      reader.onerror = (err) => reject(err);
    });

    jsonData.fileBase64 = base64;
    jsonData.fileName = file.name;
    jsonData.fileType = file.type;
  }

  const res = await fetch("/api/contact_mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData),
  });

  const result = await res.json();
  setStatus(result.success ? "Thanks for contacting us!" : "Try again");
  setIsSubmitting(false);
};

  return (
    <>
      <Header />
      <div className="min-h-screen  p-8">
        
        <motion.section 
          className="w-full py-16 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-t-primary mb-4">
            Let's Talk About Your Project
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-t-primary">
            Ready to bring your vision to life? We’d love to hear about your project and
            explore how we can help you achieve your goals.
          </p>
        </motion.section>

        {/* Contact Form Section */}
        <section className="max-w-6xl mx-auto  px-4 pb-20">
          <motion.div 
            className="grid md:grid-cols-2 justify-center items-center md:items-start gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }} 
          >
            
            {/* --- Left Column: Form --- */}
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8"
            >
              <h2 className="text-2xl font-bold text-t-primary mb-2">Send us a message</h2>
              <p className="text-t-secondary mb-6">
                Fill out the form below and we’ll get back to you within 24 hours.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-t-primary ml-2">Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-t-primary ml-2">Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-t-primary ml-2">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Your company name"
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="projectType" className="text-t-primary ml-2">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
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
                  <label htmlFor="budget" className="text-t-primary ml-2">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-20k">$10k - $20k</option>
                    <option value="20k+">$20k+</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="timeline" className="text-t-primary ml-2">Time Line</label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary  rounded-2xl p-4 p-x-8 outline-none focus:ring-2 focus:ring-purple-400"
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
                  <label htmlFor="projectDetail" className="text-t-primary ml-2">Project Detail *</label>
                  <textarea
                    id="projectDetail"
                    name="projectDetail"
                    rows={4}
                    required
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-dashed text-t-primary border-purple-300 rounded-lg p-8 text-center relative cursor-pointer transition"
                >
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="pointer-events-none flex flex-col items-center">
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Uploaded preview"
                          className="w-32 h-32 object-cover rounded-lg mb-2 border"
                        />
                        <p className="text-t-primary text-sm font-medium">
                          {file?.name}
                        </p>
                      </>
                    ) : file ? (
                      <p className="text-t-primary font-medium">
                        📎 {file.name} ({Math.round(file.size / 1024)} KB)
                      </p>
                    ) : (
                      <div>
                        <IoMdCloudUpload className="text-4xl text-t-primary ml-24 mb-2" />
                        <p className="text-t_secondary">
                          Drop files here or click to upload <br />
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Checkbox */}
                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-t-primary">
                    I agree to the processing of my personal data in accordance with the{" "}
                    <Link href="/privacy-policy" className="text-t_secondary underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to receive communications about this inquiry.
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(129, 69, 181, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg- text-white bg-t-secondary py-3 rounded-md transition disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                {status && <p className="mt-2 text-center text-t-primary font-medium">{status}</p>}
              </form>
            </motion.div>

            {/* --- Right Column: Side Info --- */}
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              
              {/* Schedule Call Card */}
             <motion.div
                variants={scaleInVariants}
             className="bg-bg-primary border-[#EAD5F9] rounded-2xl p-8 text-center">
             <h2 className="text-2xl font-bold text-t-primary mb-2">
               Schedule a call
             </h2>

                  <p className="text-t-secondary mb-4">
                   Prefer to talk? Book a free 30-minute consultation call with our team
                 </p>

  <div className="bg-bg-secondary flex flex-col items-center justify-center py-10 rounded-xl">
    {!showOptions ? (
      <>
        {/* Default View */}
        <MdCalendarToday className="text-t-primary text-5xl mb-4" />
        <p className="text-t-primary font-bold text-xl mb-4">Calendly</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowOptions(true)}
          className="bg-[#8145B5] text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          Book a Call
        </motion.button>
      </>
    ) : (
      <>
        <p className="text-t-primary font-bold text-xl mb-6">
          Choose  meeting duration
        </p>

        <motion.div className="flex flex-col gap-3 w-full px-6"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, }}
          viewport={{once:false}}
        >
          <a
            href = {calendly15}
            target="_blank"
            className="bg-bg-primary text-t-primary py-2 rounded-lg hover:bg-secondary hover:text-t-primary transition  hover:scale-105"
          >
            15 min meeting
          </a>

          <a
            href={calendly30}
            target="_blank"
            className="bg-bg-primary text-t-primary py-2 rounded-lg hover:bg-secondary hover:text-t-primary transition  hover:scale-105"
          >
            30 min meeting
          </a>

          <a
            href={calendly60}
            target="_blank"
            className="bg-bg-primary text-t-primary py-2 rounded-lg hover:bg-secondary hover:text-t-primary transition  hover:scale-105"
          >
            60 min meeting
          </a>
        </motion.div>
      </>
    )}
  </div>
</motion.div>


              {/* Contact Info List */}
              <div className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8 space-y-4">
                <h3 className="text-2xl font-bold text-t-primary">Get in touch</h3>

                <div className="flex items-center gap-3">
                  <Mail className="text-t-secondary" />
                  <a href="mailto:info@devisgon.com" className="text-t-secondary hover:underline">
                    info@devisgon.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-t-secondary" />
                  <a href="tel:+923316944411" className="text-t-secondary hover:underline">
                    +92 331 6944411
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-t-secondary" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Okara,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-t-secondary hover:underline"
                  >
                    Okara, Pakistan
                  </a>
                </div>

                {/* Social Icons (Enhanced Animation) */}
                <div className="flex flex-row gap-4 justify-start p-4">
                  {[
                    { Link: "https://www.facebook.com/Devisgon/", Icon: FaSquareFacebook },
                    { Link: "https://www.linkedin.com/company/devisgon/", Icon: IoLogoLinkedin },
                    { Link: "https://www.instagram.com/devisgon", Icon: FaInstagram },
                  ].map((social, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-t-secondary text-3xl cursor-pointer"
                    >
                      <a href={social.Link} target="_blank">
                        <social.Icon />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>
</div>
      <Footer />
    </>
  );
}