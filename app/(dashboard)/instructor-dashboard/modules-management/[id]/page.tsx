"use client";
import {use} from "react";
import { useFetchById } from "@/hooks/swr/useFetchById";

export default function ModuleManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);

  const {data, isLoading, isError, refetch} = useFetchById("/modules/get-modules-by-course-id", courseId);

  return <div>ModuleManagementPage - {courseId}</div>;
}
