"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import {
  getGetStartedPageDataByLang,
  normalizeLanguage,
  type SupportedLanguage,
} from "@/lib/localized-content";

type ApplicationType = "Job" | "Internship";

type CareerDoc = {
  type: ApplicationType;
  title: string;
};

const getCookieValue = (name: string): string | null => {
  const token = `${name}=`;
  const match = document.cookie.split("; ").find((cookie) => cookie.startsWith(token));
  return match ? decodeURIComponent(match.slice(token.length)) : null;
};

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

export default function GetStartedClient() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("en");

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+92");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [appType, setAppType] = useState<ApplicationType | "">("");
  const [selectedProgram, setSelectedProgram] = useState("");

  const [jobPrograms, setJobPrograms] = useState<string[]>([]);
  const [internshipPrograms, setInternshipPrograms] = useState<string[]>([]);

  const [isFormActive, setIsFormActive] = useState<boolean>(true);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);

  useEffect(() => {
    const syncLanguageFromCookie = () => {
      setCurrentLang(normalizeLanguage(getCookieValue("lang")));
    };

    syncLanguageFromCookie();
    window.addEventListener("app-language-change", syncLanguageFromCookie);
    return () => window.removeEventListener("app-language-change", syncLanguageFromCookie);
  }, []);

  const content = useMemo(() => getGetStartedPageDataByLang(currentLang), [currentLang]);

  useEffect(() => {
    async function fetchCareers() {
      try {
        const [settingsRes, careersRes] = await Promise.all([
          fetch("/api/globals/form-settings"),
          fetch("/api/careers?where[isActive][equals]=true&limit=100"),
        ]);

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.isGetStartedFormActive !== undefined) {
            setIsFormActive(settingsData.isGetStartedFormActive);
          }
        }

        if (careersRes.ok) {
          const data = (await careersRes.json()) as { docs: CareerDoc[] };
          const jobs: string[] = [];
          const internships: string[] = [];

          data.docs.forEach((doc) => {
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

  const availableApplicationTypes = useMemo(() => {
    const types: ApplicationType[] = [];
    if (jobPrograms.length > 0) types.push("Job");
    if (internshipPrograms.length > 0) types.push("Internship");
    return types;
  }, [jobPrograms, internshipPrograms]);

  const hasOpenings = availableApplicationTypes.length > 0;

  useEffect(() => {
    if (availableApplicationTypes.length === 1) {
      setAppType(availableApplicationTypes[0]);
      return;
    }

    if (appType && !availableApplicationTypes.includes(appType)) {
      setAppType("");
      setSelectedProgram("");
    }
  }, [availableApplicationTypes, appType]);

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const cleanValue = value.replace(/\s+/g, "");
    const regex = /^\+92\d{10}$/;
    return regex.test(cleanValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !hasOpenings) return;

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError(content.form.status.invalid_email);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError(content.form.status.invalid_phone);
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) return;

    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries()) as Record<string, string>;

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
    setStatus(result.success ? content.form.status.success : content.form.status.error);
    setIsSubmitting(false);

    if (result.success && formRef.current) {
      formRef.current.reset();
      setFile(null);
      setAppType(availableApplicationTypes.length === 1 ? availableApplicationTypes[0] : "");
      setSelectedProgram("");
      setPhone("+92");
      setEmail("");
    }
  };

  const availablePrograms =
    appType === "Job"
      ? jobPrograms
      : appType === "Internship"
        ? internshipPrograms
        : [];

  const isProgramDisabled = !appType || availablePrograms.length === 0;
  const programPlaceholder = !appType
    ? content.form.program_options.pick_type_first
    : content.form.program_options.placeholder;

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
          <h1 className="text-4xl md:text-5xl font-extrabold text-t-primary mb-4">
            {content.hero_title}
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-t-primary">
            {content.hero_description}
          </p>
        </motion.section>

        <section className="max-w-6xl mx-auto px-4 pb-20">
          <motion.div
            className="grid md:grid-cols-[2fr_1fr] justify-center items-center md:items-start gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              variants={fadeInUpVariants}
              className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8"
            >
              {!isLoadingSettings && !isFormActive ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-t-primary mb-4">
                    {content.form_inactive.title}
                  </h2>
                  <p className="text-t-secondary mb-6 leading-relaxed">
                    {content.form_inactive.description}
                  </p>
                </div>
              ) : !hasOpenings && !isLoadingSettings ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-t-primary mb-4">
                    {content.no_openings.title}
                  </h2>
                  <p className="text-t-secondary mb-6 leading-relaxed">
                    {content.no_openings.description}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-t-primary mb-2">{content.form.title}</h2>
                  <p className="text-t-secondary mb-6">{content.form.description}</p>

                  <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-t-primary ml-2">
                          {content.form.labels.full_name}
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder={content.form.placeholders.full_name}
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
                              setEmailError(content.form.status.invalid_email);
                            } else {
                              setEmailError("");
                            }
                          }}
                          placeholder={content.form.placeholders.email}
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1 ml-2">{emailError}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="text-t-primary ml-2">
                          {content.form.labels.phone}
                        </label>
                        <input
                          id="phone"
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPhone(value);
                            if (value && !validatePhone(value)) {
                              setPhoneError(content.form.status.invalid_phone);
                            } else {
                              setPhoneError("");
                            }
                          }}
                          placeholder={content.form.placeholders.phone}
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {phoneError && <p className="text-red-500 text-sm mt-1 ml-2">{phoneError}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="education" className="text-t-primary ml-2">
                          {content.form.labels.education}
                        </label>
                        <input
                          id="education"
                          type="text"
                          name="education"
                          placeholder={content.form.placeholders.education}
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="experience" className="text-t-primary ml-2">
                          {content.form.labels.experience}
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          {content.form.experience_options.map((option) => (
                            <option key={option.value || "placeholder"} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="portfolioLink" className="text-t-primary ml-2">
                          {content.form.labels.portfolio}
                        </label>
                        <input
                          id="portfolioLink"
                          type="text"
                          name="portfolioLink"
                          placeholder={content.form.placeholders.portfolio}
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="applicationType" className="text-t-primary ml-2">
                          {content.form.labels.application_type}
                        </label>
                        <select
                          id="applicationType"
                          name="applicationType"
                          value={appType}
                          onChange={(e) => {
                            setAppType(e.target.value as ApplicationType | "");
                            setSelectedProgram("");
                          }}
                          required
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          {availableApplicationTypes.length > 1 && (
                            <option value="">{content.form.application_type_options.placeholder}</option>
                          )}
                          {availableApplicationTypes.includes("Job") && (
                            <option value="Job">{content.form.application_type_options.job}</option>
                          )}
                          {availableApplicationTypes.includes("Internship") && (
                            <option value="Internship">
                              {content.form.application_type_options.internship}
                            </option>
                          )}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="program" className="text-t-primary ml-2">
                          {content.form.labels.available_programs}
                        </label>
                        <select
                          id="program"
                          name="program"
                          value={selectedProgram}
                          onChange={(e) => setSelectedProgram(e.target.value)}
                          required
                          disabled={isProgramDisabled}
                          className="text-t-primary border-[#D1AFEC] bg-bg-secondary rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
                        >
                          <option value="">
                            {isProgramDisabled ? programPlaceholder : content.form.program_options.placeholder}
                          </option>
                          {availablePrograms.map((prog) => (
                            <option key={prog} value={prog}>
                              {prog}
                            </option>
                          ))}
                        </select>
                        {appType && availablePrograms.length === 0 && (
                          <p className="text-sm text-t-secondary ml-2">
                            {content.form.program_options.none_available}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="text-t-primary ml-2 mb-1 block">
                        {content.form.labels.upload_cv}
                      </label>
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
                              Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
                            </p>
                          ) : (
                            <div>
                              <IoMdCloudUpload className="text-4xl text-t-primary mx-auto mb-2" />
                              <p className="text-t_secondary">
                                {content.form.upload.drop_text}
                                <br />
                                {content.form.upload.types_text}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex items-start gap-2 text-sm pt-2">
                      <input type="checkbox" className="mt-1" required />
                      <p className="text-t-primary">
                        {content.form.labels.privacy_prefix}{" "}
                        <Link href="/privacy-policies" className="text-t_secondary underline">
                          {content.form.labels.privacy_policy}
                        </Link>
                        .
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !!emailError || !!phoneError || isProgramDisabled}
                      whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(129, 69, 181, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-t-secondary text-white py-3 rounded-md transition disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? content.form.buttons.submitting : content.form.buttons.submit}
                    </motion.button>

                    {status && <p className="mt-4 text-center text-t-primary font-medium">{status}</p>}
                  </form>
                </>
              )}
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <motion.div className="bg-bg-primary border border-[#EAD5F9] rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-t-primary mb-3">{content.side_card.title}</h2>
                <p className="text-t-secondary mb-6 text-sm leading-relaxed">
                  {content.side_card.description}
                </p>

                <ul className="text-left space-y-3 text-t-primary text-sm list-disc list-inside marker:text-gray-500">
                  {content.side_card.benefits.map((benefit) => (
                    <li key={benefit.title}>
                      <span className="font-semibold">{benefit.title}:</span> {benefit.description}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className="bg-bg-primary rounded-2xl border-[#E5E7EB] p-8 space-y-4">
                <h3 className="text-2xl font-bold text-t-primary">{content.contact.title}</h3>

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
                    {content.contact.location}
                  </a>
                </div>

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
      <Footer />
    </>
  );
}

