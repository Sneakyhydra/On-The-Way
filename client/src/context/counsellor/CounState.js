// Imports
import { useReducer } from "react";
import CounContext from "./counContext";
import counReducer from "./counReducer";
import {
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  STUD_LOAD_SUCCESS,
  STUD_LOAD_FAIL,
  CLEAR_ERRORS,
  FEED_SUCCESS,
  FEED_FAIL,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
  MESSAGE_LOAD_SUCCESS,
  MESSAGE_LOAD_FAIL,
} from "../types";
import axios from "axios";

const CounState = (props) => {
  // Set initial state
  const initialState = {
    loading: true,
    error: null,
    quesAns: null,
    students: null,
    messages: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(counReducer, initialState);

  const loadQuesAns = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/quesans
      const res = await axios.get("api/counsellor/quesans");

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

  const loadStudents = async () => {
    try {
      // Make a get request at localhost:5000/api/admin/quesans
      const res = await axios.get("api/counsellor/students");

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

  // Submit Feedback
  const submitFeed = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a post request at localhost:5000/api/users/student
      await axios.post("api/counsellor/submitFeed", formData, config);

      // Dispatch the action to reducer for REGISTER_SUCCESS
      dispatch({
        type: FEED_SUCCESS,
      });
    } catch (err) {
      // Dispatch the action to reducer for REGISTER_FAIL
      dispatch({
        type: FEED_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const loadMessages = async () => {
    try {
      const res = await axios.get("api/counsellor/message");

      dispatch({
        type: MESSAGE_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_LOAD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const sendMessage = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post("api/counsellor/message", formData, config);

      dispatch({
        type: MESSAGE_SEND_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_SEND_FAIL,
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
    <CounContext.Provider
      // Provide these values to all components wrapped in AuthContext in App.js
      value={{
        loading: state.loading,
        error: state.error,
        quesAns: state.quesAns,
        students: state.students,
        messages: state.messages,
        clearErrors,
        loadQuesAns,
        loadStudents,
        submitFeed,
        loadMessages,
        sendMessage,
      }}
    >
      {props.children}
    </CounContext.Provider>
  );
};

export default CounState;
