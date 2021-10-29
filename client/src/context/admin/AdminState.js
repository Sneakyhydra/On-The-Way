// Imports
import { useReducer } from "react";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import {
  CLEAR_ERRORS,
  PENDING_SUCCESS,
  PENDING_FAIL,
  APPROVE_SUCCESS,
  APPROVE_FAIL,
  REJECT_SUCCESS,
  REJECT_FAIL,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_FAIL,
  STUD_LOAD_SUCCESS,
  STUD_LOAD_FAIL,
  COUN_LOAD_SUCCESS,
  COUN_LOAD_FAIL,
  REJECTED_SUCCESS,
  REJECTED_FAIL,
} from "../types";
import axios from "axios";

const AdminState = (props) => {
  // Set initial state
  const initialState = {
    loading: true,
    error: null,
    quesAns: [],
    pending: null,
    students: null,
    counsellors: null,
    rejected: null,
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

  const loadRejected = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/pending
      const res = await axios.get("api/admin/rejected");

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: REJECTED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: REJECTED_FAIL,
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
      loadCounsellors();
      loadRejected();
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
      loadCounsellors();
      loadRejected();
    } catch (err) {
      dispatch({
        type: REJECT_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const loadQuesAns = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/quesans
      const res = await axios.get("api/admin/quesans");

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: QUIZ_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: QUIZ_LOAD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const updateQuiz = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put("api/admin/quiz", formData, config);

      dispatch({
        type: QUIZ_UPDATE_SUCCESS,
      });

      await loadQuesAns();
    } catch (err) {
      dispatch({
        type: QUIZ_UPDATE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const loadStudents = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/quesans
      const res = await axios.get("api/admin/students");

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: STUD_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: STUD_LOAD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const loadCounsellors = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/quesans
      const res = await axios.get("api/admin/counsellors");

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: COUN_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: COUN_LOAD_FAIL,
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
        quesAns: state.quesAns,
        pending: state.pending,
        students: state.students,
        counsellors: state.counsellors,
        rejected: state.rejected,
        clearErrors,
        loadPending,
        approveCoun,
        rejectCoun,
        loadQuesAns,
        updateQuiz,
        loadStudents,
        loadCounsellors,
        loadRejected,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
