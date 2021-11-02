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
  APPROVED_SUCCESS,
  APPROVED_FAIL,
  REJECTED_SUCCESS,
  REJECTED_FAIL,
  COUN_FEED_SUCCESS,
  COUN_FEED_FAIL,
  STUD_FEED_SUCCESS,
  STUD_FEED_FAIL,
  FEED_DELETE_SUCCESS,
  FEED_DELETE_FAIL,
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

    case REJECTED_SUCCESS:
      return {
        ...state,
        loading: false,
        rejected: action.payload,
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
        quesAns: null,
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

    case REJECTED_FAIL:
      return {
        ...state,
        loading: false,
        rejected: null,
        error: action.payload,
      };

    case APPROVE_FAIL:
    case REJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STUD_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
      };

    case APPROVED_SUCCESS:
      return {
        ...state,
        loading: false,
        approved: action.payload,
      };

    case STUD_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        students: null,
        error: action.payload,
      };

    case APPROVED_FAIL:
      return {
        ...state,
        loading: false,
        approved: null,
        error: action.payload,
      };

    case COUN_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        counfeed: action.payload,
      };

    case COUN_FEED_FAIL:
      return {
        ...state,
        loading: false,
        counfeed: null,
        error: action.payload,
      };

    case STUD_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        studfeed: action.payload,
      };

    case STUD_FEED_FAIL:
      return {
        ...state,
        loading: false,
        studfeed: null,
        error: action.payload,
      };

    case FEED_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FEED_DELETE_FAIL:
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
