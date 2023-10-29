export const getToken = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; 
  return { userId, token };
};
