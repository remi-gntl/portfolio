export interface Project {
  id: number;
  created_at: string;
  Title: string;
  Description: string;
  Img: string;
  Link: string;
  Github: string;
  TechStack: string[];
  Features: string[];
}
export interface Skill {
  id: number;
  name: string;
  category: string;
  image: string;
}