export const getCourseById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/get-course-details/${id}`,
  );

  return res.json();
};
