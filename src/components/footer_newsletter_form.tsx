"use client";

import { useState } from "react";

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
    invalidEmail: "براہ کرم درست ای میل درج کریں",
    success: "سبسکرائب کرنے کا شکریہ!",
    placeholder: "اپنا ای میل پتہ درج کریں",
    button: "ابھی سبسکرائب کریں",
    buttonLoading: "سبسکرائب ہو رہا ہے...",
    genericError: "سبسکرپشن ناکام ہوئی۔ دوبارہ کوشش کریں۔",
    alreadySubscribed: "آپ پہلے سے سبسکرائب کر چکے ہیں۔",
  },
  ar: {
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    success: "شكرا لاشتراكك!",
    placeholder: "أدخل عنوان بريدك الإلكتروني",
    button: "اشترك الآن",
    buttonLoading: "جارٍ الاشتراك...",
    genericError: "فشل الاشتراك. يرجى المحاولة مرة أخرى.",
    alreadySubscribed: "أنت مشترك بالفعل.",
  },
  zh: {
    invalidEmail: "请输入有效的电子邮箱",
    success: "感谢订阅！",
    placeholder: "请输入您的电子邮箱地址",
    button: "立即订阅",
    buttonLoading: "正在订阅...",
    genericError: "订阅失败，请重试。",
    alreadySubscribed: "您已经订阅了。",
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

  const handleSubmit = async (e: React.FormEvent) => {
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
