import type { IndustryPageData } from "@/types/industries_page";

import enManufacturing from "@/data/english_data/industries/manufacturing.json";
import enHealthcare from "@/data/english_data/industries/healthcare.json";
import enEnergy from "@/data/english_data/industries/energy.json";
import enFinance from "@/data/english_data/industries/finance.json";

import urManufacturing from "@/data/urdu_data/industries/manufacturing.json";
import urHealthcare from "@/data/urdu_data/industries/healthcare.json";
import urEnergy from "@/data/urdu_data/industries/energy.json";
import urFinance from "@/data/urdu_data/industries/finance.json";

import arManufacturing from "@/data/arabic_data/industries/manufacturing.json";
import arHealthcare from "@/data/arabic_data/industries/healthcare.json";
import arEnergy from "@/data/arabic_data/industries/energy.json";
import arFinance from "@/data/arabic_data/industries/finance.json";

import frManufacturing from "@/data/french_data/industries/manufacturing.json";
import frHealthcare from "@/data/french_data/industries/healthcare.json";
import frEnergy from "@/data/french_data/industries/energy.json";
import frFinance from "@/data/french_data/industries/finance.json";

import deManufacturing from "@/data/german_data/industries/manufacturing.json";
import deHealthcare from "@/data/german_data/industries/healthcare.json";
import deEnergy from "@/data/german_data/industries/energy.json";
import deFinance from "@/data/german_data/industries/finance.json";

import esManufacturing from "@/data/spanish_data/industries/manufacturing.json";
import esHealthcare from "@/data/spanish_data/industries/healthcare.json";
import esEnergy from "@/data/spanish_data/industries/energy.json";
import esFinance from "@/data/spanish_data/industries/finance.json";

import zhManufacturing from "@/data/chinese_data/industries/manufacturing.json";
import zhHealthcare from "@/data/chinese_data/industries/healthcare.json";
import zhEnergy from "@/data/chinese_data/industries/energy.json";
import zhFinance from "@/data/chinese_data/industries/finance.json";

export const industriesData: Record<string, Record<string, IndustryPageData>> = {
  en: {
    manufacturing: enManufacturing as IndustryPageData,
    healthcare: enHealthcare as IndustryPageData,
    energy: enEnergy as IndustryPageData,
    finance: enFinance as IndustryPageData,
  },
  ur: {
    manufacturing: urManufacturing as IndustryPageData,
    healthcare: urHealthcare as IndustryPageData,
    energy: urEnergy as IndustryPageData,
    finance: urFinance as IndustryPageData,
  },
  ar: {
    manufacturing: arManufacturing as IndustryPageData,
    healthcare: arHealthcare as IndustryPageData,
    energy: arEnergy as IndustryPageData,
    finance: arFinance as IndustryPageData,
  },
  fr: {
    manufacturing: frManufacturing as IndustryPageData,
    healthcare: frHealthcare as IndustryPageData,
    energy: frEnergy as IndustryPageData,
    finance: frFinance as IndustryPageData,
  },
  de: {
    manufacturing: deManufacturing as IndustryPageData,
    healthcare: deHealthcare as IndustryPageData,
    energy: deEnergy as IndustryPageData,
    finance: deFinance as IndustryPageData,
  },
  es: {
    manufacturing: esManufacturing as IndustryPageData,
    healthcare: esHealthcare as IndustryPageData,
    energy: esEnergy as IndustryPageData,
    finance: esFinance as IndustryPageData,
  },
  zh: {
    manufacturing: zhManufacturing as IndustryPageData,
    healthcare: zhHealthcare as IndustryPageData,
    energy: zhEnergy as IndustryPageData,
    finance: zhFinance as IndustryPageData,
  },
};
