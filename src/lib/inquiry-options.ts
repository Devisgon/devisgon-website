import { getNavbarDataByLang } from "@/lib/localized-content";
import { servicePriority } from "@/lib/service-priorities";
import { localizeCountryOptions } from "@/lib/localize-country-options";

export type SelectOption = {
  value: string;
  label: string;
};

const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
const PRIORITY_COUNTRY_CODES = ["US", "CA", "NL", "DE", "GB", "FR", "AU", "NZ", "QA", "KW", "SA", "AE"];

const COUNTRY_CODES = `AC AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET EU FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU IC ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TA TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS XA XC XK XO YE YT ZA ZM ZW`.split(
  " ",
);

export const COUNTRY_OPTIONS: SelectOption[] = COUNTRY_CODES
  .filter((countryCode) => /^[A-Z]{2}$/.test(countryCode) && !["XA", "XC", "XO", "EU", "UN"].includes(countryCode))
  .map((countryCode) => ({
    value: displayNames.of(countryCode) ?? countryCode,
    label: displayNames.of(countryCode) ?? countryCode,
    priority: PRIORITY_COUNTRY_CODES.includes(countryCode) ? PRIORITY_COUNTRY_CODES.indexOf(countryCode) : PRIORITY_COUNTRY_CODES.length,
  }))
  .sort((a, b) => a.priority - b.priority || a.label.localeCompare(b.label, "en", { sensitivity: "base" }))
  .map(({ value, label }) => ({ value, label }));

/** Keep the submitted country value stable while showing its name in the selected UI language. */
export function getCountryOptions(language: string | null | undefined): SelectOption[] {
  return localizeCountryOptions(COUNTRY_OPTIONS, language);
}

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
      priority: servicePriority(link.href),
    }))
    .sort((a, b) => a.priority - b.priority || a.label.localeCompare(b.label, language ?? "en", { sensitivity: "base" }))
    .map(({ value, label }) => ({ value, label }));
}
