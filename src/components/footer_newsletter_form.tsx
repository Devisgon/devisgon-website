"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type NewsletterCopy = {
  invalidEmail: string;
  success: string;
  placeholder: string;
  button: string;
  buttonLoading: string;
  genericError: string;
  alreadySubscribed: string;
};

const copyByLang: Record<string, NewsletterCopy> = {
  en: {
    invalidEmail: "Please enter a valid email",
    success: "Thanks for subscribing!",
    placeholder: "Enter your email address",
    button: "Subscribe Now",
    buttonLoading: "Subscribing...",
    genericError: "Subscription failed. Please try again.",
    alreadySubscribed: "You are already subscribed.",
  },
  ur: {
    invalidEmail: "\u0628\u0631\u0627\u06c1 \u06a9\u0631\u0645 \u062f\u0631\u0633\u062a \u0627\u06cc \u0645\u06cc\u0644 \u062f\u0631\u062c \u06a9\u0631\u06cc\u06ba",
    success: "\u0633\u0628\u0633\u06a9\u0631\u0627\u0626\u0628 \u06a9\u0631\u0646\u06d2 \u06a9\u0627 \u0634\u06a9\u0631\u06cc\u06c1!",
    placeholder: "\u0627\u067e\u0646\u0627 \u0627\u06cc \u0645\u06cc\u0644 \u067e\u062a\u06c1 \u062f\u0631\u062c \u06a9\u0631\u06cc\u06ba",
    button: "\u0627\u0628\u06be\u06cc \u0633\u0628\u0633\u06a9\u0631\u0627\u0626\u0628 \u06a9\u0631\u06cc\u06ba",
    buttonLoading: "\u0633\u0628\u0633\u06a9\u0631\u0627\u0626\u0628 \u06c1\u0648 \u0631\u06c1\u0627 \u06c1\u06d2...",
    genericError: "\u0633\u0628\u0633\u06a9\u0631\u067e\u0634\u0646 \u0646\u0627\u06a9\u0627\u0645 \u06c1\u0648\u0626\u06cc\u06d4 \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba\u06d4",
    alreadySubscribed: "\u0622\u067e \u067e\u06c1\u0644\u06d2 \u0633\u06d2 \u0633\u0628\u0633\u06a9\u0631\u0627\u0626\u0628 \u06a9\u0631 \u0686\u06a9\u06d2 \u06c1\u06cc\u06ba\u06d4",
  },
  ar: {
    invalidEmail: "\u064a\u0631\u062c\u0649 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u062d\u064a\u062d",
    success: "\u0634\u0643\u0631\u0627 \u0644\u0627\u0634\u062a\u0631\u0627\u0643\u0643!",
    placeholder: "\u0623\u062f\u062e\u0644 \u0639\u0646\u0648\u0627\u0646 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
    button: "\u0627\u0634\u062a\u0631\u0643 \u0627\u0644\u0622\u0646",
    buttonLoading: "\u062c\u0627\u0631 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643...",
    genericError: "\u0641\u0634\u0644 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.",
    alreadySubscribed: "\u0623\u0646\u062a \u0645\u0634\u062a\u0631\u0643 \u0628\u0627\u0644\u0641\u0639\u0644.",
  },
  zh: {
    invalidEmail: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7535\u5b50\u90ae\u7bb1",
    success: "\u611f\u8c22\u8ba2\u9605\uff01",
    placeholder: "\u8bf7\u8f93\u5165\u60a8\u7684\u7535\u5b50\u90ae\u7bb1",
    button: "\u7acb\u5373\u8ba2\u9605",
    buttonLoading: "\u6b63\u5728\u8ba2\u9605...",
    genericError: "\u8ba2\u9605\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u3002",
    alreadySubscribed: "\u60a8\u5df2\u7ecf\u8ba2\u9605\u4e86\u3002",
  },
  es: {
    invalidEmail: "Por favor ingresa un correo valido",
    success: "Gracias por suscribirte!",
    placeholder: "Ingresa tu direccion de correo",
    button: "Suscribete ahora",
    buttonLoading: "Suscribiendo...",
    genericError: "La suscripcion fallo. Intentalo de nuevo.",
    alreadySubscribed: "Ya estas suscrito.",
  },
  de: {
    invalidEmail: "Bitte gib eine gueltige E-Mail-Adresse ein",
    success: "Danke fuer dein Abo!",
    placeholder: "Gib deine E-Mail-Adresse ein",
    button: "Jetzt abonnieren",
    buttonLoading: "Abonniere...",
    genericError: "Abonnement fehlgeschlagen. Bitte erneut versuchen.",
    alreadySubscribed: "Du bist bereits abonniert.",
  },
  fr: {
    invalidEmail: "Veuillez saisir un e-mail valide",
    success: "Merci pour votre abonnement !",
    placeholder: "Entrez votre adresse e-mail",
    button: "S'abonner maintenant",
    buttonLoading: "Abonnement en cours...",
    genericError: "Echec de l'abonnement. Veuillez reessayer.",
    alreadySubscribed: "Vous etes deja abonne.",
  },
};

const FooterNewsletterForm = ({ lang = "en" }: { lang?: string }) => {
  const copy = copyByLang[lang] ?? copyByLang.en;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError(copy.invalidEmail);
      setSuccess("");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter_subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        alreadySubscribed?: boolean;
        message?: string;
      };

      if (!res.ok || !data.success) {
        setSuccess("");
        setError(data.message || copy.genericError);
        return;
      }

      setSuccess(data.alreadySubscribed ? copy.alreadySubscribed : copy.success);
      setEmail("");
    } catch (submitError) {
      console.error("Newsletter subscribe failed", submitError);
      setSuccess("");
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 mt-2 w-full max-w-xs mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          const value = e.target.value;
          setEmail(value);

          if (value && !validateEmail(value)) {
            setError(copy.invalidEmail);
          } else {
            setError("");
          }
        }}
        placeholder={copy.placeholder}
        required
        className="w-full px-4 py-3 rounded-lg border text-black border-[#E0D4F5] bg-white text-sm focus:outline-none focus:border-secondary"
      />

      {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}
      {success && <p className="text-green-600 text-sm -mt-4">{success}</p>}

      <button
        type="submit"
        disabled={!!success || isSubmitting}
        className="w-full py-3 bg-[#8145B5] text-white rounded-lg text-sm font-semibold hover:bg-bg-primary hover:text-t-secondary transition-colors shadow-md disabled:opacity-50"
      >
        {isSubmitting ? copy.buttonLoading : copy.button}
      </button>
    </form>
  );
};

export default FooterNewsletterForm;
