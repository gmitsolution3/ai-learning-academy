interface User {
  name: string;
  email: string;
  phone: string;
}

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
  user: User;
  consultancy_type: "Online" | "Offline" | "Hybrid";
  topic: string;
  isEnrolledCourse: boolean;
  description: string;
  instructorId: string;
  courseDetails?: CourseDetails;
}