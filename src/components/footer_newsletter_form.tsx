"use client";

import { useState } from "react";

const FooterNewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Thanks for subscribing!");
    setEmail("");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2 w-full max-w-xs mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          const value = e.target.value;
          setEmail(value);

          if (value && !validateEmail(value)) {
            setError("Please enter a valid email");
          } else {
            setError("");
          }
        }}
        placeholder="Enter your email address"
        className="w-full px-4 py-3 rounded-lg border text-black border-[#E0D4F5] bg-white text-sm focus:outline-none focus:border-secondary"
      />

      {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}
      {success && <p className="text-green-600 text-sm -mt-4">{success}</p>}

      <button
        type="submit"
        disabled={!!success}
        className="w-full py-3 bg-[#8145B5] text-white rounded-lg text-sm font-semibold hover:bg-bg-primary hover:text-t-secondary transition-colors shadow-md disabled:opacity-50"
      >
        Subscribe Now
      </button>
    </form>
  );
};

export default FooterNewsletterForm;
