export interface ICourse {
  title: string;
  slug: string;
  overview: string;
  description: string;
  category: string;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  totalEnrolled: number;
  rating: number;
  price: number;
  discountPercent: number;
  image: string;
}
