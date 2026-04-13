export interface IUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  imagePublicId?: string;
  createdAt: string;
  phone: string;
  role: "admin" | "user" | "instructor";
  isSuperAdmin?: boolean;
}

export interface IUserProfile extends IUser {
  id?: string;
  address?: string;
  gender?: string;
  age?: number;
  instituteName?: string;
  educationLevel?: string;
  bio?: string;
  occupation?: string;
}
