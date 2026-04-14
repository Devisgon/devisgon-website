"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

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



export default function GetStartedPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+92");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [appType, setAppType] = useState<"Job" | "Internship" | "">("");

  const [jobPrograms, setJobPrograms] = useState<string[]>([]);
  const [internshipPrograms, setInternshipPrograms] = useState<string[]>([]);

  const [isFormActive, setIsFormActive] = useState<boolean>(true);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCareers() {
      try {
        const [settingsRes, careersRes] = await Promise.all([
          fetch("/api/globals/form-settings"),
          fetch("/api/careers?where[isActive][equals]=true&limit=100")
        ]);

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.isGetStartedFormActive !== undefined) {
            setIsFormActive(settingsData.isGetStartedFormActive);
          }
        }

        if (careersRes.ok) {
          const data = await careersRes.json();
          const jobs: string[] = [];
          const internships: string[] = [];
          data.docs.forEach((doc: any) => {
            if (doc.type === "Job") jobs.push(doc.title);
            if (doc.type === "Internship") internships.push(doc.title);
          });
          setJobPrograms(jobs);
          setInternshipPrograms(internships);
        }
      } catch (error) {
        console.error("Failed to fetch careers", error);
      } finally {
        setIsLoadingSettings(false);
      }
    }
    fetchCareers();
  }, []);

  useEffect(() => {
    if (!isLoadingSettings && !isFormActive) {
      router.push("/");
    }
  }, [isLoadingSettings, isFormActive, router]);

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    // Ensures starts with +92 and followed by 10 digits (ignoring spaces)
    const cleanValue = value.replace(/\s+/g, '');
    const regex = /^\+92\d{10}$/;
    return regex.test(cleanValue);
  };

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

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Use a valid email");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError("use a valid phone number");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) return;

    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());

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

    const res = await fetch("/api/apply_mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });

    const result = await res.json();
    setStatus(result.success ? "Application submitted successfully!" : "Failed to submit application. Please try again.");
    setIsSubmitting(false);

    if (result.success && formRef.current) {
      formRef.current.reset();
      setFile(null);
      setPreview(null);
      setAppType("");
      setPhone("+92");
      setEmail("");
    }
  };

  const availablePrograms = appType === "Job" ? jobPrograms : appType === "Internship" ? internshipPrograms : [];

  return (
    <>
      <div className="min-h-screen p-8">

        <motion.section
          className="w-full py-16 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-t-primary mb-4">
            Join Our Team
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-t-primary">
            Looking for a job or an internship? Tell us about yourself, upload your CV, and start your journey with DEVISGON .
          </p>
        </motion.section>

        {/* Application Form Section */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <motion.div
            className="grid md:grid-cols-[2fr_1fr] justify-center items-center md:items-start gap-10"
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
              {!isLoadingSettings && !isFormActive ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-t-primary mb-4">There is no active jobs now</h2>
                  <p className="text-t-secondary mb-6 leading-relaxed">
                    Apply in next session or subscribe our newsletter to get information about it.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-t-primary mb-2">Apply Now</h2>
                  <p className="text-t-secondary mb-6">
                    Fill out the application form below.
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-t-primary ml-2">Full Name *</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Your full name"
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
                          value={email}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            if (value && !validateEmail(value)) {
                              setEmailError("Use a valid email");
                            } else {
                              setEmailError("");
                            }
                          }}
                          placeholder="your@email.com"
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1 ml-2">{emailError}</p>}
                      </div>
                    </div>

                    {/* Phone & Education */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="text-t-primary ml-2">Phone Number *</label>
                        <input
                          id="phone"
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPhone(value);
                            if (value && !validatePhone(value)) {
                              setPhoneError("Must start with +92 and have 10 digits");
                            } else {
                              setPhoneError("");
                            }
                          }}
                          placeholder="+92 300 1234567"
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {phoneError && <p className="text-red-500 text-sm mt-1 ml-2">{phoneError}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="education" className="text-t-primary ml-2">Education *</label>
                        <input
                          id="education"
                          type="text"
                          name="education"
                          placeholder="e.g. BS Computer Science"
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    {/* Experience & Portfolio */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="experience" className="text-t-primary ml-2">Experience</label>
                        <select
                          id="experience"
                          name="experience"
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          <option value="">Select experience</option>
                          <option value="None / Fresher">None / Fresher</option>
                          <option value="0-1 Years">0-1 Years</option>
                          <option value="1-3 Years">1-3 Years</option>
                          <option value="3+ Years">3+ Years</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="portfolioLink" className="text-t-primary ml-2">Portfolio / LinkedIn ID</label>
                        <input
                          id="portfolioLink"
                          type="text"
                          name="portfolioLink"
                          placeholder="https://linkedin.com"
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    {/* Job or Internship & Program Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="applicationType" className="text-t-primary ml-2">Application Type *</label>
                        <select
                          id="applicationType"
                          name="applicationType"
                          value={appType}
                          onChange={(e) => setAppType(e.target.value as "Job" | "Internship" | "")}
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          <option value="">Select type...</option>
                          <option value="Job">Job</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="program" className="text-t-primary ml-2">Available Programs *</label>
                        <select
                          id="program"
                          name="program"
                          required
                          disabled={!appType}
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
                        >
                          <option value="">Select a program...</option>
                          {availablePrograms.map((prog) => (
                            <option key={prog} value={prog}>{prog}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="pt-2">
                      <label className="text-t-primary ml-2 mb-1 block">Upload CV</label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="border-2 border-dashed text-t-primary border-purple-300 rounded-lg p-8 text-center relative cursor-pointer transition bg-bg-secondary"
                      >
                        <input
                          type="file"
                          name="file"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />

                        <div className="pointer-events-none flex flex-col items-center">
                          {file ? (
                            <p className="text-t-primary font-medium">
                              📎 {file.name} ({Math.round(file.size / 1024)} KB)
                            </p>
                          ) : (
                            <div>
                              <IoMdCloudUpload className="text-4xl text-t-primary mx-auto mb-2" />
                              <p className="text-t_secondary">
                                Drop your CV here .<br />
                                PDF, DOC, DOCX up to 5MB
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-2 text-sm pt-2">
                      <input type="checkbox" className="mt-1" required />
                      <p className="text-t-primary">
                        I agree to the processing of my personal data in accordance with the{" "}
                        <Link href="/privacy_policies" className="text-t_secondary underline">
                          Privacy Policy
                        </Link>.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !!emailError || !!phoneError}
                      whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(129, 69, 181, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-t-secondary text-white py-3 rounded-md transition disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </motion.button>

                    {status && <p className="mt-4 text-center text-t-primary font-medium">{status}</p>}
                  </form>
                </>
              )}
            </motion.div>

            {/* --- Right Column: Side Info --- */}
            <motion.div variants={fadeInUpVariants} className="space-y-6">

              {/* Info Card */}
              <motion.div className="bg-bg-primary border border-[#EAD5F9] rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-t-primary mb-3">
                  Why Join DEVISGON?
                </h2>
                <p className="text-t-secondary mb-6 text-sm leading-relaxed">
                  We are a team of passionate developers, designers, and innovators. Come build the future with us and take your career to the next level.
                </p>

                {/* Professional Bulleted List */}
                <ul className="text-left space-y-3 text-t-primary text-sm list-disc list-inside marker:text-gray-500">
                  <li>
                    <span className="font-semibold">Innovative Projects:</span> Work on cutting-edge solutions that challenge the status quo.
                  </li>
                  <li>
                    <span className="font-semibold">Career Growth:</span> Clear pathways for advancement and professional development.
                  </li>
                  <li>
                    <span className="font-semibold">Collaborative Environment:</span> Partner with talented peers in a supportive and inclusive culture.
                  </li>
                  <li>
                    <span className="font-semibold">Learning Opportunities:</span> Continuous education through hands-on experience and mentorship.
                  </li>
                </ul>
              </motion.div>


              {/* Contact Info List */}
              <div className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8 space-y-4">
                <h3 className="text-2xl font-bold text-t-primary">Contact Us</h3>

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

                {/* Social Icons */}
                <div className="flex flex-row gap-4 justify-start pt-4">
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
                      <a href={social.Link} target="_blank" rel="noopener noreferrer">
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
    </>
  );
}
