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
  ANS_LOAD_SUCCESS,
  ANS_LOAD_FAIL,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_FAIL,
} from "../types";

// Change state according to the type of action
const adminReducer = (state, action) => {
  switch (action.type) {
    case PENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        pending: action.payload,
      };

    case QUES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };

    case QUES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        questions: null,
        error: action.payload,
      };

    case ANS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        answers: action.payload,
      };

    case ANS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        answers: null,
        error: action.payload,
      };

    case QUIZ_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        answers: null,
        error: action.payload,
        questions: null,
      };

    case QUIZ_UPDATE_SUCCESS:
    case APPROVE_SUCCESS:
    case REJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case PENDING_FAIL:
      return {
        ...state,
        loading: false,
        pending: null,
        error: action.payload,
      };

    case APPROVE_FAIL:
    case REJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default adminReducer;
