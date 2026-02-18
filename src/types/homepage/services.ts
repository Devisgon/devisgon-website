export interface ServiceCard {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image_alt?: any;
  link: string;
}

export interface ServicesSectionData {
  header_title: string;
  main_title: string;
  services_list: ServiceCard[];
}

export interface ServicesSectionProps {
  data: ServicesSectionData;
}
