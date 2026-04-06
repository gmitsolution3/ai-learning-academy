export const getAvatarInitial = (session: any) => {
  if (session?.user?.name) {
    return session.user.name.charAt(0).toUpperCase();
  }
  if (session?.user?.email) {
    return session.user.email.charAt(0).toUpperCase();
  }
  return "U";
};
