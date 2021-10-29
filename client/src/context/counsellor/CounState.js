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
} from "../types";
import axios from "axios";

const CounState = (props) => {
  // Set initial state
  const initialState = {
    loading: true,
    error: null,
    quesAns: null,
    students: null,
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
        clearErrors,
        loadQuesAns,
        loadStudents,
      }}
    >
      {props.children}
    </CounContext.Provider>
  );
};

export default CounState;
