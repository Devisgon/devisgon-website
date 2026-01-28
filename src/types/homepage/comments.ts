export interface TestimonialReview {
  name: string;
  role: string;
  image: string;
  review: string;
}

export interface TestimonialData {
  title:string;
  icon:string;
  subtitle_note: string;
  reviews: TestimonialReview[];
}

export interface TestimonialSectionProps {
  data: TestimonialData;
}
