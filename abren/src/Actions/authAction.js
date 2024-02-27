export const loginSucess = (user) => ({
  type: "LOGIN_SUCESS",
  payload: user,
});

export const logoutSucess = () => ({
  type: "LOGOUT_SUCESS",
});
