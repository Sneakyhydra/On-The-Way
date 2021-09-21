import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {
  // Set initial state
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // Make a get request at localhost:5000/api/auth
      const res = await axios.get("/api/auth");

      // Dispatch the action to reducer for USER_LOADED
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      // Dispatch the action to reducer for AUTH_ERROR
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a post request at localhost:5000/api/users
      const res = await axios.post("api/users", formData, config);

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Load the user after successful registration
      loadUser();
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = () => {
    console.log("login");
  };

  // Logout
  const logout = () => {
    console.log("logout");
  };

  // Clear Errors
  const clearErrors = () => {
    // Dispatch the action to reducer for CLEAR_ERRORS
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      // Provide these values to all components wrapped in AuthContext
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
