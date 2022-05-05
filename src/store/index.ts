import { combineReducers, compose, createStore, Reducer, Store } from "redux";

const reducers: Record<string, Reducer> = {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

interface CustomStore extends Store {
  asyncReducers: Record<string, Reducer>;
  injectReducer: (key: string, asyncReducer: Reducer) => void;
}

function createReducer(asyncReducers?: Record<string, Reducer>) {
  return combineReducers({
    ...reducers,
    ...asyncReducers,
  });
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers();

function configureStore(initialState = {}) {
  const s = createStore(
    (st = {}) => st,
    initialState,
    enhancers
  ) as CustomStore;

  s.asyncReducers = {};

  s.injectReducer = (key, asyncReducer) => {
    s.asyncReducers[key] = asyncReducer;
    s.replaceReducer(createReducer(s.asyncReducers));
  };

  return s;
}

const store = configureStore();

export default store;
