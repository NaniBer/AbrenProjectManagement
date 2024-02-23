const initialState = {
<<<<<<< HEAD
    projectLoaded: false,
    project: null,
  };
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOAD_PROJECT":
        return {
          ...state,
          projectLoaded: true,
          project: action.payload,
        };
      case "UNLOAD_PROJECT":
        return {
          ...state,
          projectLoaded: false,
          project: null,
        };
      default:
        return state;
    }
  };
  export default projectReducer;
=======
  projectLoaded: false,
  project: null,
};
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PROJECT":
      return {
        ...state,
        projectLoaded: true,
        project: action.payload,
      };
    case "UNLOAD_PROJECT":
      return {
        ...state,
        projectLoaded: false,
        project: null,
      };
    default:
      return state;
  }
};
export default projectReducer;
>>>>>>> 0d0ec9c507e0997f1bd8c03263731b8b1ba43e08
