export interface ServiceFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
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
