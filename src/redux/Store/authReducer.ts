import { AnyAction } from "redux";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../../redux/Store/authActions";

interface AuthState {
  user: any;
  accessToken: string | null;
  role: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  role: null,
  error: null,
};

const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        role: action.payload.role,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        accessToken: null,
        role: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
