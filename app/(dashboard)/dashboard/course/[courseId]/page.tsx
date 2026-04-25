import { redirect } from "next/navigation";

export default function CoursePage() {
  // Normally fetched from DB
  const firstLessonId = "l1";

  redirect(`/dashboard/course/react/lesson/${firstLessonId}`);
}
