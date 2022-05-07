import { useEffect, useState } from "react";
import { Reducer } from "redux";
import store from "store";
import { getState, injectReducer, subscribe } from "store/utilities/utilities";

type AuthState = {
  isGuestUser: boolean;
  isLoggedInUser: boolean;
};

const STORE_KEY = "auth";

export const initialAuthState: AuthState = {
  isGuestUser: false,
  isLoggedInUser: false,
};

const reducers: Record<string, Reducer> = {
  setIsGuestUser: (state) => ({
    ...state,
    isGuestUser: true,
  }),
  setIsLoggedInUser: ({ isLoggedInUser, ...state }) => ({
    ...state,
    isLoggedInUser: true,
  }),
};

injectReducer(STORE_KEY, initialAuthState, reducers);

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>(
    getState(STORE_KEY) ?? initialAuthState
  );

  useEffect(() => {
    subscribe(STORE_KEY, setState);
  }, [setState]);

  return state;
};

// Add dispatch functions here.
export function setGuestUser() {
  localStorage.setItem("isGuest", "true");
  store.dispatch({ type: "setIsGuestUser" });
}
