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

    case QUIZ_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        quesAns: action.payload,
      };

    case QUIZ_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        quesAns: [],
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
