import axios from "axios"; // To make requests to the backend

const setAuthToken = (token) => {
  // If token exists
  if (token) {
    // Add token in global headers
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Delete token in global headers
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
