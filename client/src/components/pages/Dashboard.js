// Imports
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import DashNavbar from "../layout/DashNavbar";
import { Tab, Tabs } from "react-bootstrap";
import ProfileTab from "../tabs/ProfileTab";
import HistoryTab from "../tabs/HistoryTab";
import M from "materialize-css/dist/js/materialize.min.js";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { key, setKey } = authContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    authContext.loadUser();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return "loading";
  }
  return (
    <div style={{ fontFamily: "Lucida Sans, sans-serif" }}>
      <DashNavbar />
      <Tabs
        activeKey={key}
        className='mb-3'
        onSelect={(k) => setKey(k)}
        style={{ marginTop: "1.1rem" }}
        variant='pills'
      >
        <Tab eventKey='history' title='History'>
          <HistoryTab />
        </Tab>
        <Tab eventKey='profile' title='Profile'>
          <ProfileTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
