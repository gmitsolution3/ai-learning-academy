import { ICategoryListType, IUserProfile } from "@/types";
export interface ICourse {
  _id: string;
  created_at: string;
  updated_at: string;

  title: string;
  slug: string;
  short_description: string;
  full_description: string;

  thumbnail: string;
  preview_video: string;

  instructor_id: string[];

  regular_price: number;
  discount_price: number;

  course_level: string;
  language: string;

  total_duration: number; // minutes (assuming)

  status: string;

  category: ICategoryListType;
}

export interface ICourseDetail extends ICourse {
  instructor: IUserProfile[];
}
