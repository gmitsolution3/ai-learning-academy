import { IBatch, ICategoryListType, IUserProfile } from "@/types";
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
  batch: IBatch;
}

export interface ICourseDetail extends ICourse {
  instructor: IUserProfile[];
}

export interface IEnrolledCourse {
  _id: string;
  created_at: string;
  enroll_date: string;
  user_email: string;
  progress: number;
  last_accessed: string;
  course_type: string;
  course: ICourseDetail;
  batch: IBatch[];
}

export interface ITransformedCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  batch: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  image?: string;
  thumbnail?: string;
  lastAccessed?: string;
  slug: string;
}