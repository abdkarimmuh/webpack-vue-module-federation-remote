export const checkSession = () => {
  const sessionNDS = localStorage.getItem("ndsui-session");
  return !sessionNDS;
};
