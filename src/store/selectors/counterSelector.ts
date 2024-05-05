import { RootState } from "@store/rootReducer";

const SelectCount = (state: RootState) => state.counter.count;

export { SelectCount };
