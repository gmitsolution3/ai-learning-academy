export interface ICourse {
  _id: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  thumbnail: string;
  instructor_id: string[];
  regular_price: number;
  discount_price: number;
  course_level: "beginner" | "intermediate" | "advanced";
  language: string;
  total_duration: number;
  status: "draft" | "published" | "archived";
}
