export interface ICategory {
  _id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  parent_id: string | null;
}