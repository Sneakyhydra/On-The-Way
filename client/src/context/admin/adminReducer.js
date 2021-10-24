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

// Change state according to the type of action
const adminReducer = (state, action) => {
  switch (action.type) {
    case PENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        pending: action.payload,
      };

    case APPROVE_SUCCESS:
    case REJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case PENDING_FAIL:
    case APPROVE_FAIL:
    case REJECT_FAIL:
      return {
        ...state,
        loading: false,
        pending: null,
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
