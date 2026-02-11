export interface ServiceFeature {
  icon?: any; 
  title: string;
  details: string;
}

export interface ServiceItem {
  category: string;
  headline: string;
  span: string;
  description: string;
  features: ServiceFeature[];
  image: string;
  deliverables: string[];
  tech_stack: string[];
  bg?: string;
  forn?: Serviceform[];

}
export interface Serviceform{
  headline:string;
  descdescription:string;
}

export interface ServicesListProps {
  data: ServiceItem[];
}
