import { ILesson } from "./lesson.type";

export interface IModule {
  _id: string;
  course_id: string;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  order_index: number;
}

export interface ILessonDataForModuleList {
  _id: string;
  module_id: string;
  created_at: string;
  updated_at: string;
  lessons: ILesson[];
}

export interface IModuleList extends IModule {
  module_id: string;
  lesson_data: ILessonDataForModuleList[];
}