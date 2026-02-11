"use client";
import { useLanguage } from '@/context/language_contaxt';

export default function LangSwitcher() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="px-4 py-2  text-white rounded-md font-medium "
    >
      {lang === 'en' ? 'اردو' : 'English'}
    </button>
  );
}