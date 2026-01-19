export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQFooter {
  text: string;
  link_text: string;
  link_url: string;
}

export interface FAQSectionData {
  title: string;
  subtitle: string;
  questions: FAQItem[];
  footer: FAQFooter;
}

export interface FAQSectionProps {
  data: FAQSectionData;
}
