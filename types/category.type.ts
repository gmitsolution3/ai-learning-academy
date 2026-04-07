export interface ICategory {
  _id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  image: string;
  imagePublicId: string;
  description: string;
  parent_id: string | null;
}

export interface ICategoryListType extends Omit<
  ICategory,
  "parent_id"
> {
  parent_id: ICategory | null;
}
