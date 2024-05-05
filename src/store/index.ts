import { createStore, applyMiddleware, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer, { RootState } from "@store/rootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["counter"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunkMiddleware);

const store: Store<RootState> = createStore(
  persistedReducer,
  composeWithDevTools(middleware)
);
export const persistor = persistStore(store);

export default store;
