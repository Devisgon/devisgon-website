
export interface WhatYouGetItem {
  title: string;
  description: string;
}

export interface WhatYouGetSectionData {
  title: string;
  list_items: WhatYouGetItem[];
  image: string;
}

export interface WhatYouGetSectionProps {
  data: WhatYouGetSectionData;
}
