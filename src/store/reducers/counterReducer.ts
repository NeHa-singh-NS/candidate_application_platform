import { Reducer } from "redux";
import { CounterAction, CounterType } from "@store/types/counterType";

const initialState: CounterType = {
  count: 0,
};

const counterReducer: Reducer<CounterType, CounterAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count + -1 };
    default:
      return state;
  }
};

export default counterReducer;
