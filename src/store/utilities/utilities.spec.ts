import { Reducer } from "redux";
import store from "store";
import { getState, injectReducer, subscribe } from "./utilities";

const storeMock = jest.mocked(store);

export const initialState: Record<string, string> = {
  text: "",
};

const STORE_KEY = "test";

describe("modular redux utilities", () => {
  describe("injectReducer", () => {
    const reducers: Record<string, Reducer> = {
      setTestText: (state, text) => ({
        ...state,
        text,
      }),
    };

    it("should inject a new reducer into the store", () => {
      expect(store.getState()).toMatchObject({});

      injectReducer(STORE_KEY, initialState, reducers);

      expect(store.getState()).toMatchObject({ [STORE_KEY]: initialState });
    });
  });

  describe("getState", () => {
    it("should return the current state", () => {
      expect(getState(STORE_KEY)).toMatchObject(initialState);
    });
  });

  describe("subscribe", () => {
    it("should subscribe to state changes", () => {
      const callbackMockFn = jest.fn();

      subscribe("test", callbackMockFn);
      storeMock.dispatch({ type: "setTestText", payload: "any payload" });

      expect(callbackMockFn).toHaveBeenCalled();
    });
  });
});
