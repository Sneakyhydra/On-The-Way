// Imports
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  // Load the user when dashboard is rendered
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ fontFamily: "Lucida Sans, sans-serif" }}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
