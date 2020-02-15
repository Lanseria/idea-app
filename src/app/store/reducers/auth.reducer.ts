import { User } from "@/app/models/user";
import { AuthAction, AuthActionTypes } from "../actions/auth.action";

export interface AuthState {
  user?: User;
}

const initialState: AuthState = {
  user: null
};

export const authReducer: (
  state: AuthState,
  action: AuthAction
) => AuthState = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
