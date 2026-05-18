// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceDetailData = any;

import enBrandingKit from "@/data/english_data/services/digital_design/branding_kit.json";
import enGraphical from "@/data/english_data/services/digital_design/graphical.json";
import enLogoDesign from "@/data/english_data/services/digital_design/logo_design.json";
import enMobileDesign from "@/data/english_data/services/digital_design/mobile_design.json";
import enProductDeign from "@/data/english_data/services/digital_design/product_deign.json";
import enPrototypingAndWireframe from "@/data/english_data/services/digital_design/prototyping_and_wireframe.json";
import enUiUxDesign from "@/data/english_data/services/digital_design/ui_ux_design.json";
import enWebDesign from "@/data/english_data/services/digital_design/web_design.json";

import urBrandingKit from "@/data/urdu_data/services/digital_design/branding_kit.json";
import urGraphical from "@/data/urdu_data/services/digital_design/graphical.json";
import urLogoDesign from "@/data/urdu_data/services/digital_design/logo_design.json";
import urMobileDesign from "@/data/urdu_data/services/digital_design/mobile_design.json";
import urProductDeign from "@/data/urdu_data/services/digital_design/product_deign.json";
import urPrototypingAndWireframe from "@/data/urdu_data/services/digital_design/prototyping_and_wireframe.json";
import urUiUxDesign from "@/data/urdu_data/services/digital_design/ui_ux_design.json";
import urWebDesign from "@/data/urdu_data/services/digital_design/web_design.json";

import arBrandingKit from "@/data/arabic_data/services/digital_design/branding_kit.json";
import arGraphical from "@/data/arabic_data/services/digital_design/graphical.json";
import arLogoDesign from "@/data/arabic_data/services/digital_design/logo_design.json";
import arMobileDesign from "@/data/arabic_data/services/digital_design/mobile_design.json";
import arProductDeign from "@/data/arabic_data/services/digital_design/product_deign.json";
import arPrototypingAndWireframe from "@/data/arabic_data/services/digital_design/prototyping_and_wireframe.json";
import arUiUxDesign from "@/data/arabic_data/services/digital_design/ui_ux_design.json";
import arWebDesign from "@/data/arabic_data/services/digital_design/web_design.json";

import deBrandingKit from "@/data/german_data/services/digital_design/branding_kit.json";
import deGraphical from "@/data/german_data/services/digital_design/graphical.json";
import deLogoDesign from "@/data/german_data/services/digital_design/logo_design.json";
import deMobileDesign from "@/data/german_data/services/digital_design/mobile_design.json";
import deProductDeign from "@/data/german_data/services/digital_design/product_deign.json";
import dePrototypingAndWireframe from "@/data/german_data/services/digital_design/prototyping_and_wireframe.json";
import deUiUxDesign from "@/data/german_data/services/digital_design/ui_ux_design.json";
import deWebDesign from "@/data/german_data/services/digital_design/web_design.json";

import esBrandingKit from "@/data/spanish_data/services/digital_design/branding_kit.json";
import esGraphical from "@/data/spanish_data/services/digital_design/graphical.json";
import esLogoDesign from "@/data/spanish_data/services/digital_design/logo_design.json";
import esMobileDesign from "@/data/spanish_data/services/digital_design/mobile_design.json";
import esProductDeign from "@/data/spanish_data/services/digital_design/product_deign.json";
import esPrototypingAndWireframe from "@/data/spanish_data/services/digital_design/prototyping_and_wireframe.json";
import esUiUxDesign from "@/data/spanish_data/services/digital_design/ui_ux_design.json";
import esWebDesign from "@/data/spanish_data/services/digital_design/web_design.json";

import zhBrandingKit from "@/data/chinese_data/services/digital_design/branding_kit.json";
import zhGraphical from "@/data/chinese_data/services/digital_design/graphical.json";
import zhLogoDesign from "@/data/chinese_data/services/digital_design/logo_design.json";
import zhMobileDesign from "@/data/chinese_data/services/digital_design/mobile_design.json";
import zhProductDeign from "@/data/chinese_data/services/digital_design/product_deign.json";
import zhPrototypingAndWireframe from "@/data/chinese_data/services/digital_design/prototyping_and_wireframe.json";
import zhUiUxDesign from "@/data/chinese_data/services/digital_design/ui_ux_design.json";
import zhWebDesign from "@/data/chinese_data/services/digital_design/web_design.json";

import frBrandingKit from "@/data/french_data/services/digital_design/branding_kit.json";
import frGraphical from "@/data/french_data/services/digital_design/graphical.json";
import frLogoDesign from "@/data/french_data/services/digital_design/logo_design.json";
import frMobileDesign from "@/data/french_data/services/digital_design/mobile_design.json";
import frProductDeign from "@/data/french_data/services/digital_design/product_deign.json";
import frPrototypingAndWireframe from "@/data/french_data/services/digital_design/prototyping_and_wireframe.json";
import frUiUxDesign from "@/data/french_data/services/digital_design/ui_ux_design.json";
import frWebDesign from "@/data/french_data/services/digital_design/web_design.json";

const serviceEntries = (brandingKit: ServiceDetailData, graphical: ServiceDetailData, logoDesign: ServiceDetailData, mobileDesign: ServiceDetailData, productDeign: ServiceDetailData, prototypingAndWireframe: ServiceDetailData, uiUxDesign: ServiceDetailData, webDesign: ServiceDetailData) => ({
  "branding-kit-design": brandingKit,
  "branding-kit": brandingKit,
  "graphic-design": graphical,
  "graphical": graphical,
  "logo-design": logoDesign,
  "mobile-app-design": mobileDesign,
  "mobile-design": mobileDesign,
  "product-design": productDeign,
  "product-deign": productDeign,
  "prototyping-wireframing": prototypingAndWireframe,
  "prototyping-and-wireframe": prototypingAndWireframe,
  "ui-ux-design": uiUxDesign,
  "web-design": webDesign,
});

export const workflowData: Record<string, Record<string, ServiceDetailData>> = {
  en: serviceEntries(enBrandingKit, enGraphical, enLogoDesign, enMobileDesign, enProductDeign, enPrototypingAndWireframe, enUiUxDesign, enWebDesign),
  ur: serviceEntries(urBrandingKit, urGraphical, urLogoDesign, urMobileDesign, urProductDeign, urPrototypingAndWireframe, urUiUxDesign, urWebDesign),
  ar: serviceEntries(arBrandingKit, arGraphical, arLogoDesign, arMobileDesign, arProductDeign, arPrototypingAndWireframe, arUiUxDesign, arWebDesign),
  de: serviceEntries(deBrandingKit, deGraphical, deLogoDesign, deMobileDesign, deProductDeign, dePrototypingAndWireframe, deUiUxDesign, deWebDesign),
  es: serviceEntries(esBrandingKit, esGraphical, esLogoDesign, esMobileDesign, esProductDeign, esPrototypingAndWireframe, esUiUxDesign, esWebDesign),
  zh: serviceEntries(zhBrandingKit, zhGraphical, zhLogoDesign, zhMobileDesign, zhProductDeign, zhPrototypingAndWireframe, zhUiUxDesign, zhWebDesign),
  fr: serviceEntries(frBrandingKit, frGraphical, frLogoDesign, frMobileDesign, frProductDeign, frPrototypingAndWireframe, frUiUxDesign, frWebDesign),
};
