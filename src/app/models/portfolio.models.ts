export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];          // technology tags used for filtering
  demoUrl: string;
  repoUrl: string;
  imageUrl?: string;
}

export interface TimelineEntry {
  title: string;
  organisation: string;
  dateRange: string;       // e.g. "Jan 2022 – Present"
  description: string;
  type: 'work' | 'education';
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl?: string;
}

export interface BlogPost {
  title: string;
  publishedAt: Date;
  excerpt: string;
  coverImageUrl: string;
  readMoreUrl: string;
}
