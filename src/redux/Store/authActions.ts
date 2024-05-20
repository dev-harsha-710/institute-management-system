export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginSuccess = (user: any, accessToken: string, role: string) => ({
  type: LOGIN_SUCCESS,
  payload: { user, accessToken, role },
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
