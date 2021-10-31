import {
  CLEAR_ERRORS,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  COUN_LOAD_SUCCESS,
  COUN_LOAD_FAIL,
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
