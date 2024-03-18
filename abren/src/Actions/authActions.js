export const loginSucess = (userData) => ({
  type: "LOGIN_SUCESS",
  payload: userData,
});

export const logoutSucess = () => ({
  type: "LOGOUT_SUCESS",
});
