import { countries } from "country-flag-icons";
import { getNavbarDataByLang } from "@/lib/localized-content";

export type SelectOption = {
  value: string;
  label: string;
};

const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

export const COUNTRY_OPTIONS: SelectOption[] = countries
  .filter((countryCode) => /^[A-Z]{2}$/.test(countryCode))
  .map((countryCode) => ({
    value: displayNames.of(countryCode) ?? countryCode,
    label: displayNames.of(countryCode) ?? countryCode,
  }))
  .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));

export function getServiceInquiryOptions(language: string | null | undefined): SelectOption[] {
  const servicesNavItem = getNavbarDataByLang(language).navbar.find((item) => item.href === "/services");
  const serviceLinks = servicesNavItem?.dropdown?.columns.flatMap((column) => column.links) ?? [];
  const seen = new Set<string>();

  return serviceLinks
    .filter((link) => {
      if (seen.has(link.href)) {
        return false;
      }

      seen.add(link.href);
      return true;
    })
    .map((link) => ({
      value: link.name,
      label: link.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, language ?? "en", { sensitivity: "base" }));
}
