export interface ProcessChecklistCard {
  items: string[];
}

export interface CoreInfoCard {
  title: string;
  content: string;
  bg: string;        // background color
  main_text: string; // title color
  text: string;      // content color
}

export interface ExpertServicesData {
  main_heading: string;
  image: string;
  process_checklist_card: ProcessChecklistCard;
  core_info_cards: CoreInfoCard[];
}

export interface ExpertServicesSectionProps {
  data: ExpertServicesData;
}
