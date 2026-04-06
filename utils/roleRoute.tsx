export const ROLE_ROUTE = {
  admin: "/admin-dashboard",
  user: "/dashboard",
} as const;

export type ROLE = keyof typeof ROLE_ROUTE;