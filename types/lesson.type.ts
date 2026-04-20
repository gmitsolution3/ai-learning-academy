export interface ILesson {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content_type: "text" | "video" | "link";
  content_url: string;
  duration: number;
  order_index: number;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}