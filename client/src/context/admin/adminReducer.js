import {
  CLEAR_ERRORS,
  PENDING_SUCCESS,
  PENDING_FAIL,
  APPROVE_FAIL,
  REJECT_FAIL,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  QUIZ_UPDATE_FAIL,
  STUD_LOAD_SUCCESS,
  STUD_LOAD_FAIL,
  APPROVED_SUCCESS,
  APPROVED_FAIL,
  REJECTED_SUCCESS,
  REJECTED_FAIL,
  COUN_FEED_SUCCESS,
  COUN_FEED_FAIL,
  STUD_FEED_SUCCESS,
  STUD_FEED_FAIL,
  FEED_DELETE_FAIL,
} from "../types";

// Change state according to the type of action
const adminReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_LOAD_SUCCESS:
      return {
        ...state,
        quesAns: action.payload,
      };

    case QUIZ_LOAD_FAIL:
      return {
        ...state,
        quesAns: null,
        error: action.payload,
      };

    case QUIZ_UPDATE_FAIL:
      return {
        ...state,
        answers: null,
        error: action.payload,
        questions: null,
      };

    case PENDING_SUCCESS:
      return {
        ...state,
        pending: action.payload,
      };

    case PENDING_FAIL:
      return {
        ...state,
        pending: null,
        error: action.payload,
      };

    case APPROVE_FAIL:
    case REJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case REJECTED_SUCCESS:
      return {
        ...state,
        rejected: action.payload,
      };

    case REJECTED_FAIL:
      return {
        ...state,
        rejected: null,
        error: action.payload,
      };

    case APPROVED_SUCCESS:
      return {
        ...state,
        approved: action.payload,
      };

    case APPROVED_FAIL:
      return {
        ...state,
        approved: null,
        error: action.payload,
      };

    case STUD_LOAD_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case STUD_LOAD_FAIL:
      return {
        ...state,
        students: null,
        error: action.payload,
      };

    case COUN_FEED_SUCCESS:
      return {
        ...state,
        counfeed: action.payload,
      };

    case COUN_FEED_FAIL:
      return {
        ...state,
        counfeed: null,
        error: action.payload,
      };

    case STUD_FEED_SUCCESS:
      return {
        ...state,
        studfeed: action.payload,
      };

    case STUD_FEED_FAIL:
      return {
        ...state,
        studfeed: null,
        error: action.payload,
      };

    case FEED_DELETE_FAIL:
      return {
        ...state,
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
