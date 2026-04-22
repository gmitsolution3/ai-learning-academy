import { ICourse } from "./course.type";

export interface IEnrolledType {
  type: "Online" | "Offline";
  max_student: number;
  enrolled: number;
}

export interface IBatch {
  _id: string;
  created_at: string;
  batch_name: string;
  batch_slug: string;
  total_module: number;
  batch_starting_date: string;
  batch_ending_date: string;
  enrolled_type: IEnrolledType[];
  completed_module: number;
  batch_status: "ongoing" | "completed" | "upcoming" | "cancelled";
  course: ICourse;
}
