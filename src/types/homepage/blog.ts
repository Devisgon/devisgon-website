export interface BlogPost {
  category: string;
  image: string;
  title: string;
  date: string;
  link_text: string;
}

export interface BlogSectionData {
  header_title: string;
  main_title: string;
  subtitle: string;
  categories: string[];
  posts: BlogPost[];
}

export interface BlogSectionProps {
  data: BlogSectionData;
}
