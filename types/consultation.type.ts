import { IUser } from "./user.type";

interface CourseDetails {
  course: {
    _id: string;
    name: string;
  };
  batch: {
    _id: string;
    name: string;
  };
}

export interface IConsultation {
  _id: string;
  created_at: string;
  user: IUser;
  consultancy_type: "Online" | "Offline" | "Hybrid";
  topic: string;
  isEnrolledCourse: boolean;
  description: string;
  instructorId: string;
  courseDetails?: CourseDetails;
}