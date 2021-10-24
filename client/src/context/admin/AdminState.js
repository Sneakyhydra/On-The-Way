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
  APPROVE_SUCCESS,
  APPROVE_FAIL,
  REJECT_SUCCESS,
  REJECT_FAIL,
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

  // Load Pending
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

  // Approve Counsellor
  const approveCoun = async (counid) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const appr = {
        id: counid,
        type: "Approved",
      };
      await axios.put("api/admin/pending", appr, config);

      dispatch({
        type: APPROVE_SUCCESS,
      });

      loadPending();
    } catch (err) {
      dispatch({
        type: APPROVE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Reject Counsellor
  const rejectCoun = async (counid) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const reject = {
        id: counid,
        type: "Rejected",
      };
      await axios.put("api/admin/pending", reject, config);

      dispatch({
        type: REJECT_SUCCESS,
      });

      loadPending();
    } catch (err) {
      dispatch({
        type: REJECT_FAIL,
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
        approveCoun,
        rejectCoun,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
