import {
  CLEAR_ERRORS,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  COUN_LOAD_SUCCESS,
  COUN_LOAD_FAIL,
  FEED_FAIL,
  MESSAGE_SEND_FAIL,
  MESSAGE_LOAD_SUCCESS,
  MESSAGE_LOAD_FAIL,
} from "../types";

// Change state according to the type of action
const studReducer = (state, action) => {
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

    case COUN_LOAD_SUCCESS:
      return {
        ...state,
        counsellors: action.payload,
      };

    case COUN_LOAD_FAIL:
      return {
        ...state,
        counsellors: null,
        error: action.payload,
      };

    case MESSAGE_LOAD_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };

    case MESSAGE_LOAD_FAIL:
      return {
        ...state,
        messages: null,
        error: action.payload,
      };

    case MESSAGE_SEND_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case FEED_FAIL:
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

export default studReducer;
