import { isEmpty } from "lodash";
import { Reducer } from "redux";
import store from "store";

export function getState(key: string) {
  return store.getState()[key];
}

export function subscribe<T>(key: string, fn: (ls: T) => void) {
  let lastState = getState(key);

  function callback() {
    if (lastState !== getState(key)) {
      lastState = getState(key);
      fn(lastState);
    }
  }

  store.subscribe(callback);
}

export function injectReducer<T>(
  key: string,
  initialState: T,
  reducers: Record<string, Reducer>
) {
  // Store would sometimes be undefined before attempting to injectReducers.
  // This solution fixes that.
  // https://stackoverflow.com/questions/7307983/while-variable-is-not-defined-wait
  (async () => {
    while (!store) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    store.injectReducer(key, (state, { type, payload }) => {
      if (isEmpty(state)) {
        state = initialState;
      }

      return reducers[type] ? reducers[type](state, payload) : state;
    });
  })();
}
