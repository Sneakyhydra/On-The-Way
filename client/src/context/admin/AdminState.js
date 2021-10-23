// Imports
import { useReducer } from "react";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import {
  QUES_LOAD_SUCCESS,
  QUES_LOAD_FAIL,
  CLEAR_ERRORS,
  PENDING_SUCCESS,
  PENDING_FAIL,
} from "../types";
import axios from "axios";

const AdminState = (props) => {
  // Set initial state
  const initialState = {
    loading: true,
    error: null,
    questions: [],
    pending: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Load Questions
  const loadPending = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/pending
      const res = await axios.get("api/admin/pending");

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: PENDING_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: PENDING_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Errors
  const clearErrors = () => {
    // Dispatch the action to reducer for CLEAR_ERRORS
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AdminContext.Provider
      // Provide these values to all components wrapped in AuthContext in App.js
      value={{
        loading: state.loading,
        error: state.error,
        questions: state.questions,
        pending: state.pending,
        clearErrors,
        loadPending,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
