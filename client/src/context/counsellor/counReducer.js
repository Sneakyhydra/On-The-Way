import {
  CLEAR_ERRORS,
  QUIZ_LOAD_SUCCESS,
  QUIZ_LOAD_FAIL,
  STUD_LOAD_SUCCESS,
  STUD_LOAD_FAIL,
} from "../types";

// Change state according to the type of action
const counReducer = (state, action) => {
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

    case STUD_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
      };

    case STUD_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        students: null,
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

export default counReducer;
