export interface IUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  phone: string;
  role: "admin" | "user" | "instructor";
  isSuperAdmin?: boolean;
}
