export interface Project {
  id: number;
  created_at: string;
  Title: string;
  Description: string;
  Img: string;
  TechStack: string[];
  Link?: string; 
  Github?: string;
  Features?: string[];
  display_order?: number;
  year?: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  image: string;
  level: number; 
}