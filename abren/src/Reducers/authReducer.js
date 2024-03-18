const initialState = {
  isAuthenticated: false,
  user: null,
  notifications: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        notifications: action.payload.notifications,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        notifications: [],
      };
    default:
      return state;
  }
};
export default authReducer;
