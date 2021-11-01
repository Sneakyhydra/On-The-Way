import {
  CLEAR_ERRORS,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  COUN_LOAD_SUCCESS,
  COUN_LOAD_FAIL,
  FEED_SUCCESS,
  FEED_FAIL,
  MESSAGE_SEND_SUCCESS,
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

    case COUN_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        counsellors: action.payload,
      };

    case COUN_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        counsellors: null,
        error: action.payload,
      };

    case FEED_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FEED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MESSAGE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };

    case MESSAGE_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        messages: null,
        error: action.payload,
      };

    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case MESSAGE_SEND_FAIL:
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

export default studReducer;
