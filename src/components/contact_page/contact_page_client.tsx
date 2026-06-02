"use client";

import Footer from "@/components/footer";
import Header from "@/components/navbar";
import InternalLinks, { CORE_INTERNAL_LINKS } from "@/components/shared/internal_links";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { normalizeLanguage, type ContactPageContent } from "@/lib/localized-content";
import { COUNTRY_OPTIONS, getServiceInquiryOptions } from "@/lib/inquiry-options";

const calendly15 = process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING!;
const calendly30 = process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING || calendly15;
const calendly60 = process.env.NEXT_PUBLIC_CALENDLY_60_MIN_MEETING || calendly15;

interface ContactPageProps {
  content: ContactPageContent;
}

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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactPageClient({ content }: ContactPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const langCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("lang="))
      ?.split("=")[1];

    setCurrentLang(normalizeLanguage(langCookie ? decodeURIComponent(langCookie) : null));
  }, []);

  const projectTypeOptions = useMemo(() => {
    const defaultOption = content.form.project_type_options[0] ?? { value: "", label: "Select service" };

    return [
      { value: "", label: defaultOption.label },
      ...getServiceInquiryOptions(currentLang),
    ];
  }, [content.form.project_type_options, currentLang]);

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const regex = /^\+?[0-9\s().-]{7,20}$/;
    return regex.test(value.trim());
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
      setError(content.form.status.invalid_email);
      hasError = true;
    } else {
      setError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError("Use a valid phone number");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) return;

    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries()) as Record<string, unknown>;

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
    setStatus(result.success ? content.form.status.success : content.form.status.error);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header />
     
      <div className="min-h-screen p-8">
        <motion.section
          className="w-full py-16 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-t-primary mb-4">{content.hero_title}</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-t-primary">{content.hero_description}</p>
        </motion.section>

        <section className="max-w-6xl mx-auto px-4 pb-20">
          <motion.div
            className="grid md:grid-cols-2 justify-center items-center md:items-start gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeInUpVariants} className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8">
              <h2 className="text-2xl font-bold text-t-primary mb-2">{content.form.title}</h2>
              <p className="text-t-secondary mb-6">{content.form.description}</p>

              <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
                <input type="hidden" name="sourceType" value="contact" />
                <input type="hidden" name="sourcePage" value="/contact" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-t-primary ml-2">
                      {content.form.labels.name}
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder={content.form.placeholders.name}
                      required
                      className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-t-primary ml-2">
                      {content.form.labels.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);

                        if (value && !validateEmail(value)) {
                          setError(content.form.status.invalid_email);
                        } else {
                          setError("");
                        }
                      }}
                      placeholder={content.form.placeholders.email}
                      required
                      className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-t-primary ml-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPhone(value);

                        if (value && !validatePhone(value)) {
                          setPhoneError("Use a valid phone number");
                        } else {
                          setPhoneError("");
                        }
                      }}
                      placeholder="+92 300 1234567"
                      required
                      className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="country" className="text-t-primary ml-2">
                      {content.form.labels.country}
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">{content.form.placeholders.country}</option>
                      {COUNTRY_OPTIONS.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-t-primary ml-2">
                    {content.form.labels.company}
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder={content.form.placeholders.company}
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="projectType" className="text-t-primary ml-2">
                    {content.form.labels.project_type}
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {projectTypeOptions.map((option) => (
                      <option key={`project-type-${option.value || "default"}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="budget" className="text-t-primary ml-2">
                    {content.form.labels.budget}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {content.form.budget_options.map((option) => (
                      <option key={`budget-${option.value || "default"}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="timeline" className="text-t-primary ml-2">
                    {content.form.labels.timeline}
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {content.form.timeline_options.map((option) => (
                      <option key={`timeline-${option.value || "default"}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="projectDetail" className="text-t-primary ml-2">
                    {content.form.labels.project_detail}
                  </label>
                  <textarea
                    id="projectDetail"
                    name="projectDetail"
                    rows={4}
                    required
                    placeholder={content.form.placeholders.project_detail}
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
                        <Image
                          src={preview}
                          alt="Uploaded preview"
                          width={128}
                          height={128}
                          unoptimized
                          className="w-32 h-32 object-cover rounded-lg mb-2 border"
                        />
                        <p className="text-t-primary text-sm font-medium">{file?.name}</p>
                      </>
                    ) : file ? (
                      <p className="text-t-primary font-medium">
                        File: {file.name} ({Math.round(file.size / 1024)} KB)
                      </p>
                    ) : (
                      <div>
                        <IoMdCloudUpload className="text-4xl text-t-primary ml-24 mb-2" />
                        <p className="text-t_secondary">
                          {content.form.upload.drop_text}
                          <br />
                          {content.form.upload.types_text}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-t-primary">
                    {content.form.labels.privacy_consent}{" "}
                    <Link href="/privacy-policies" className="text-t_secondary underline">
                      {content.form.labels.privacy_policy}
                    </Link>{" "}
                    {content.form.labels.privacy_consent_suffix}
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !!error || !!phoneError}
                  whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(129, 69, 181, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-white bg-t-secondary py-3 rounded-md transition disabled:opacity-50"
                >
                  {isSubmitting ? content.form.buttons.sending : content.form.buttons.send}
                </motion.button>

                {status && <p className="mt-2 text-center text-t-primary font-medium">{status}</p>}
              </form>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <motion.div variants={scaleInVariants} className="bg-bg-primary border-[#EAD5F9] rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-t-primary mb-2">{content.schedule.title}</h2>
                <p className="text-t-secondary mb-4">{content.schedule.description}</p>

                <div className="bg-bg-secondary flex flex-col items-center justify-center py-10 rounded-xl">
                  {!showOptions ? (
                    <>
                      <MdCalendarToday className="text-t-primary text-5xl mb-4" />
                      <p className="text-t-primary font-bold text-xl mb-4">{content.schedule.provider}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowOptions(true)}
                        className="bg-[#8145B5] text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
                      >
                        {content.schedule.book_button}
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <p className="text-t-primary font-bold text-xl mb-6">{content.schedule.choose_duration}</p>

                      <motion.div
                        className="flex flex-col gap-3 w-full px-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                      >
                        <a
                          href={calendly15}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-bg-primary text-t-primary py-2 rounded-lg hover:bg-secondary hover:text-t-primary transition hover:scale-105"
                        >
                          {content.schedule.durations.min_15}
                        </a>

                        <a
                          href={calendly30}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-bg-primary text-t-primary py-2 rounded-lg hover:bg-secondary hover:text-t-primary transition hover:scale-105"
                        >
                          {content.schedule.durations.min_30}
                        </a>

                        <a
                          href={calendly60}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-bg-primary text-t-primary py-2 rounded-lg hover:bg-secondary hover:text-t-primary transition hover:scale-105"
                        >
                          {content.schedule.durations.min_60}
                        </a>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>

              <div className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8 space-y-4">
                <h3 className="text-2xl font-bold text-t-primary">{content.contact_info.title}</h3>

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
                    {content.contact_info.location}
                  </a>
                </div>

                <div className="flex flex-row gap-4 justify-start p-4">
                  {[
                    { link: "https://www.facebook.com/Devisgon/", Icon: FaSquareFacebook },
                    { link: "https://www.linkedin.com/company/devisgon/", Icon: IoLogoLinkedin },
                    { link: "https://www.instagram.com/devisgon", Icon: FaInstagram },
                  ].map((social, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-t-secondary text-3xl cursor-pointer"
                    >
                      <a href={social.link} target="_blank" rel="noopener noreferrer">
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
      <InternalLinks
        title="Plan the Next Step"
        description="Use these related pages to compare services, industries, technologies, process, and articles before or after contacting us."
        links={CORE_INTERNAL_LINKS}
      />
      <Footer />
    </>
  );
}
