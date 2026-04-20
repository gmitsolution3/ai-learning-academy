"use client";
import { use } from "react";

export default function LessonManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: moduleId } = use(params);

  return <div>LessonManagementPage - {moduleId}</div>;
}
