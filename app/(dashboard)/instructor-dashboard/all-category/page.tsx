"use client";

import { useFetch } from "@/hooks/swr/useFetch";

export default function AllCategoryPage() {
  const { data } = useFetch("/categories/get-categories");

  const categoryList = data?.data || [];

  console.log(categoryList);

  return <section></section>;
}
