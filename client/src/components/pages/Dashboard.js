// Imports
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import DashNavbar from "../layout/DashNavbar";
import { Tab, Tabs } from "react-bootstrap";
import ProfileTab from "../tabs/ProfileTab";

import Pending from "../tabs/Admin/Pending";
import Questions from "../tabs/Admin/Questions";
import Counsellors from "../tabs/Admin/Counsellors";
import Students from "../tabs/Admin/Students";
import Rejected from "../tabs/Admin/Rejected";

import StudentInfo from "../tabs/Counsellor/StudentInfo";
import Quiz from "../tabs/Counsellor/Quiz";
import CounChat from "../tabs/Counsellor/CounChat";
import CounFeed from "../tabs/Counsellor/CounFeed";

import StudQuiz from "../tabs/Student/StudQuiz";
import StudCoun from "../tabs/Student/StudCoun";
import StudChat from "../tabs/Student/StudChat";
import StudFeed from "../tabs/Student/StudFeed";

import Preloader from "../layout/Preloader";
import M from "materialize-css/dist/js/materialize.min.js";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { user } = authContext;

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
      className='mb-3 z-depth-1'
      style={{
        marginTop: "1rem",
        boxShadow:
          "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
        position: "fixed",
        zIndex: "100",
        backgroundColor: "white",
        width: "100%",
      }}
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
        className='mb-3 z-depth-1'
        style={{
          marginTop: "1rem",
          boxShadow:
            "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
          position: "fixed",
          zIndex: "100",
          backgroundColor: "white",
          width: "100%",
        }}
        variant='pills'
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <ProfileTab />
        </Tab>
        <Tab eventKey='questions' title='Questions' className='z-depth-0'>
          <Questions />
        </Tab>
        <Tab eventKey='counsellors' title='Counsellors' className='z-depth-0'>
          <Tabs
            className='mb-3 z-depth-1'
            style={{
              marginTop: "0rem",
              boxShadow:
                "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
              position: "fixed",
              zIndex: "100",
              backgroundColor: "white",
              width: "480px",
              marginLeft: "10.5em",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            variant='pills'
          >
            <Tab eventKey='pending' title='Pending' className='z-depth-0'>
              <Pending />
            </Tab>
            <Tab eventKey='rejected' title='Rejected' className='z-depth-0'>
              <Rejected />
            </Tab>
            <Tab eventKey='approved' title='Approved' className='z-depth-0'>
              <Counsellors />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey='students' title='Students' className='z-depth-0'>
          <Students />
        </Tab>
      </Tabs>
    );
  } else if (role === "counsellor") {
    allTabs = (
      <Tabs
        className='mb-3 z-depth-1'
        style={{
          marginTop: "1rem",
          boxShadow:
            "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
          position: "fixed",
          zIndex: "100",
          backgroundColor: "white",
          width: "100%",
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
        {user.coun_status === "Approved" ? (
          <Tab eventKey='quiz' title='Quiz' className='z-depth-0'>
            <Quiz />
          </Tab>
        ) : (
          ""
        )}
        {user.coun_status === "Approved" ? (
          <Tab eventKey='chat' title='Chat' className='z-depth-0'>
            <CounChat />
          </Tab>
        ) : (
          ""
        )}
        {user.coun_status === "Approved" ? (
          <Tab eventKey='feed' title='Feedback' className='z-depth-0'>
            <CounFeed />
          </Tab>
        ) : (
          ""
        )}
      </Tabs>
    );
  } else if (role === "student") {
    allTabs = (
      <Tabs
        className='mb-3 z-depth-1'
        style={{
          marginTop: "1rem",
          boxShadow:
            "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
          position: "fixed",
          zIndex: "100",
          backgroundColor: "white",
          width: "100%",
        }}
        variant='pills'
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <ProfileTab />
        </Tab>
        <Tab eventKey='studquiz' title='Quiz' className='z-depth-0'>
          <StudQuiz />
        </Tab>
        <Tab eventKey='studcoun' title='Counsellors' className='z-depth-0'>
          <StudCoun />
        </Tab>
        <Tab eventKey='studchat' title='Chat' className='z-depth-0'>
          <StudChat />
        </Tab>
        <Tab eventKey='studfeed' title='Feedback' className='z-depth-0'>
          <StudFeed />
        </Tab>
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
