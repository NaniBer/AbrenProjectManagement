import { combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";
import projectReducer from "./Reducers/projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

<<<<<<< HEAD
export default rootReducer;
=======
export default rootReducer;
>>>>>>> 0d0ec9c507e0997f1bd8c03263731b8b1ba43e08
