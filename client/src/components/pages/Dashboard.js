// Imports
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import DashNavbar from "../layout/Navbar/DashNavbar";
import { Tab, Tabs } from "react-bootstrap";
import Profile from "../tabs/Profile";

// Admin
import Pending from "../tabs/Admin/Pending";
import AdminQuiz from "../tabs/Admin/AdminQuiz";
import Approved from "../tabs/Admin/Approved";
import Students from "../tabs/Admin/Students";
import Rejected from "../tabs/Admin/Rejected";
import AdminCounFeed from "../tabs/Admin/AdminCounFeed";
import AdminStudFeed from "../tabs/Admin/AdminStudFeed";

// Counsellor
import StudentInfo from "../tabs/Counsellor/StudentInfo";
import CounQuiz from "../tabs/Counsellor/CounQuiz";
import CounChat from "../tabs/Counsellor/CounChat";
import CounFeed from "../tabs/Counsellor/CounFeed";

// Student
import StudQuiz from "../tabs/Student/StudQuiz";
import StudCoun from "../tabs/Student/StudCoun";
import StudChat from "../tabs/Student/StudChat";
import StudFeed from "../tabs/Student/StudFeed";

// CSS
import Preloader from "../layout/Preloader/Preloader";
import M from "materialize-css/dist/js/materialize.min.js";
import "./Dashboard.css";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { user } = authContext;
  const [tabKey, setTabKey] = useState("profile");
  const [tabKeyCoun, setTabKeyCoun] = useState("pending");
  const [tabKeyFeed, setTabKeyFeed] = useState("counfeed");

  const [active, setActive] = useState(0);

  // Load the user when dashboard is rendered
  useEffect(() => {
    authContext.loadUser();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    document.body.style.backgroundColor = "#ddc8c4";
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }
  if (!user) {
    return <Preloader />;
  }

  const { role } = user;

  // Init allTabs with profile tab
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
        <Profile />
      </Tab>
    </Tabs>
  );

  // If user is admin
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
        defaultActiveKey='profile'
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <Profile tabKey={tabKey} />
        </Tab>
        <Tab eventKey='questions' title='Quiz' className='z-depth-0'>
          <AdminQuiz tabKey={tabKey} />
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
              marginLeft: "157.5px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            variant='pills'
            activeKey={tabKeyCoun}
            onSelect={(k) => setTabKeyCoun(k)}
            defaultActiveKey='pending'
          >
            <Tab eventKey='pending' title='Pending' className='z-depth-0'>
              <Pending tabKeyCoun={tabKeyCoun} tabKey={tabKey} />
            </Tab>
            <Tab eventKey='rejected' title='Rejected' className='z-depth-0'>
              <Rejected tabKeyCoun={tabKeyCoun} tabKey={tabKey} />
            </Tab>
            <Tab eventKey='approved' title='Approved' className='z-depth-0'>
              <Approved tabKeyCoun={tabKeyCoun} tabKey={tabKey} />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey='students' title='Students' className='z-depth-0'>
          <Students tabKey={tabKey} />
        </Tab>
        <Tab eventKey='feedback' title='Feedback' className='z-depth-0'>
          <Tabs
            className='mb-3 z-depth-1'
            style={{
              marginTop: "0rem",
              boxShadow:
                "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 3px 5px 0 rgb(0 0 0 / 20%)",
              position: "fixed",
              zIndex: "100",
              backgroundColor: "white",
              width: "322px",
              marginLeft: "553px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              flexWrap: "nowrap",
            }}
            variant='pills'
            activeKey={tabKeyFeed}
            defaultActiveKey='counfeed'
            onSelect={(k) => setTabKeyFeed(k)}
          >
            <Tab eventKey='counfeed' title='Counsellors' className='z-depth-0'>
              <AdminCounFeed tabKeyFeed={tabKeyFeed} tabKey={tabKey} />
            </Tab>
            <Tab eventKey='studfeed' title='Students' className='z-depth-0'>
              <AdminStudFeed tabKeyFeed={tabKeyFeed} tabKey={tabKey} />
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>
    );
  } else if (role === "counsellor") {
    // Else if user is counsellor
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
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
        defaultActiveKey='profile'
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <Profile tabKey={tabKey} />
        </Tab>

        {/* Show below tabs only if counsellor is approved */}
        {user.coun_status === "Approved" ? (
          <Tab eventKey='studentInfo' title='Students' className='z-depth-0'>
            <StudentInfo
              tabKey={tabKey}
              setTabKey={setTabKey}
              setActive={setActive}
            />
          </Tab>
        ) : (
          ""
        )}
        {user.coun_status === "Approved" ? (
          <Tab eventKey='counquiz' title='Quiz' className='z-depth-0'>
            <CounQuiz tabKey={tabKey} />
          </Tab>
        ) : (
          ""
        )}
        {user.coun_status === "Approved" ? (
          <Tab eventKey='chat' title='Chat' className='z-depth-0'>
            <CounChat tabKey={tabKey} active={active} setActive={setActive} />
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
    // Else if user is student
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
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
        defaultActiveKey='profile'
      >
        <Tab eventKey='profile' title='Profile' className='z-depth-0'>
          <Profile tabKey={tabKey} />
        </Tab>
        <Tab eventKey='studquiz' title='Quiz' className='z-depth-0'>
          <StudQuiz tabKey={tabKey} setTabKey={setTabKey} />
        </Tab>
        <Tab eventKey='studcoun' title='Counsellors' className='z-depth-0'>
          <StudCoun
            tabKey={tabKey}
            setTabKey={setTabKey}
            setActive={setActive}
          />
        </Tab>
        <Tab eventKey='studchat' title='Chat' className='z-depth-0'>
          <StudChat tabKey={tabKey} active={active} setActive={setActive} />
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
