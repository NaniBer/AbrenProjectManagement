const initialState = {
<<<<<<< HEAD
    isAuthenticated: false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCESS":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "LOGOUT_SUCCESS":
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  export default authReducer;
=======
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
>>>>>>> 0d0ec9c507e0997f1bd8c03263731b8b1ba43e08
