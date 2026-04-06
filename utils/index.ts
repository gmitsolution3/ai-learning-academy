export const getAvatarInitial = (session: any) => {
  if (session?.user?.name) {
    return session.user.name.charAt(0).toUpperCase();
  }
  if (session?.user?.email) {
    return session.user.email.charAt(0).toUpperCase();
  }
  return "U";
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};