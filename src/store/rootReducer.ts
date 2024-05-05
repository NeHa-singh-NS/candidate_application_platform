import { combineReducers } from "redux";
import authReducer from "@store/reducers/authReducer";
import counterReducer from "@store/reducers/counterReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
