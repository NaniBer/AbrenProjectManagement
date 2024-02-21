import { combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";
import projectReducer from "./Reducers/projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;