// Imports
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import DashNavbar from "../layout/DashNavbar";
import { Tab, Tabs } from "react-bootstrap";
import ProfileTab from "../tabs/ProfileTab";

import Pending from "../tabs/Admin/Pending";
import Questions from "../tabs/Admin/Questions";

import StudentInfo from "../tabs/Counsellor/StudentInfo";

import Preloader from "../layout/Preloader";
import M from "materialize-css/dist/js/materialize.min.js";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { key, setKey, user } = authContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    authContext.loadUser();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Preloader />;
  }
  if (!user) {
    return <Preloader />;
  }

  const { role } = user;

  let allTabs = (
    <Tabs
      activeKey={key}
      className='mb-3'
      onSelect={(k) => setKey(k)}
      style={{ marginTop: "1.1rem" }}
      variant='pills'
    >
      <Tab eventKey='profile' title='Profile'>
        <ProfileTab />
      </Tab>
    </Tabs>
  );

  if (role === "admin") {
    allTabs = (
      <Tabs
        activeKey={key}
        className='mb-3 z-depth-1'
        onSelect={(k) => setKey(k)}
        style={{
          marginTop: "1.1rem",
          boxShadow:
            "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
        }}
        variant='pills'
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <ProfileTab />
        </Tab>
        <Tab eventKey='pending' title='Pending' className='z-depth-0'>
          <Pending />
        </Tab>
        <Tab eventKey='questions' title='Questions' className='z-depth-0'>
          <Questions />
        </Tab>
      </Tabs>
    );
  } else if (role === "counsellor") {
    allTabs = (
      <Tabs
        activeKey={key}
        className='mb-3 z-depth-1'
        onSelect={(k) => setKey(k)}
        style={{
          marginTop: "1.1rem",
          boxShadow:
            "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
        }}
        variant='pills'
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <ProfileTab />
        </Tab>
        {user.coun_status === "Approved" ? (
          <Tab eventKey='studentInfo' title='Students' className='z-depth-0'>
            <StudentInfo />
          </Tab>
        ) : (
          ""
        )}
      </Tabs>
    );
  }

  return (
    <div style={{ fontFamily: "Lucida Sans, sans-serif" }}>
      <DashNavbar />
      {allTabs}
    </div>
  );
};

export default Dashboard;
