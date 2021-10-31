// Imports
import { useReducer } from "react";
import StudContext from "./studContext";
import studReducer from "./studReducer";
import {
  CLEAR_ERRORS,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  COUN_LOAD_SUCCESS,
  COUN_LOAD_FAIL,
  QUIZ_SUBMIT_SUCCESS,
  QUIZ_SUBMIT_FAIL,
  RESPONSE_LOAD_SUCCESS,
  RESPONSE_LOAD_FAIL,
} from "../types";
import axios from "axios";

const StudState = (props) => {
  // Set initial state
  const initialState = {
    loading: true,
    error: null,
    quesAns: [],
    counsellors: null,
    response: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(studReducer, initialState);

  const loadQuesAns = async () => {
    try {
      // Make a get request at localhost:5000/api/student/quesans
      const res = await axios.get("api/student/quesans");

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

  const loadCounsellors = async () => {
    try {
      // Make a get request at localhost:5000/api/student/counsellors
      const res = await axios.get("api/student/counsellors");

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

  const loadResponse = async () => {
    try {
      const res = await axios.get("api/student/response");

      dispatch({
        type: RESPONSE_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RESPONSE_LOAD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const submitQuiz = async (formData) => {
    // Set header of the input data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post("api/student/submitQuiz", formData, config);

      dispatch({
        type: QUIZ_SUBMIT_SUCCESS,
      });

      await loadQuesAns();
    } catch (err) {
      dispatch({
        type: QUIZ_SUBMIT_FAIL,
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
    <StudContext.Provider
      // Provide these values to all components wrapped in AuthContext in App.js
      value={{
        loading: state.loading,
        error: state.error,
        quesAns: state.quesAns,
        counsellors: state.counsellors,
        clearErrors,
        loadQuesAns,
        loadCounsellors,
        submitQuiz,
        loadResponse,
      }}
    >
      {props.children}
    </StudContext.Provider>
  );
};

export default StudState;
