// Imports
import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  // Set initial state
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 1500) => {
    // Create id of alert
    const id = uuid();

    // Dispatch the action to reducer for SET_ALERT
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    // Dispatch the action to reducer for REMOVE_ALERT after a given timeout
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      // Provide these values to all components wrapped in AlertContext
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
