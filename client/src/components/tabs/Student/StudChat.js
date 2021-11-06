import { useEffect, useContext } from "react";
import StudContext from "../../../context/student/studContext";
import M from "materialize-css/dist/js/materialize.min.js";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader/Preloader";
import StudMess from "../../layout/Student/Chat/StudMess";
import StudUsers from "../../layout/Student/Chat/StudUsers";

const StudChat = ({ tabKey, active, setActive }) => {
  const studContext = useContext(StudContext);
  const alertContext = useContext(AlertContext);

  const { loadMessages, messages, error, counsellors, loadCounsellors } =
    studContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();

    if (error) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "studchat") {
      loadCounsellors();
      loadMessages();
    }
    // eslint-disable-next-line
  }, [tabKey]);

  useEffect(() => {}, [active]);

  if (!messages) {
    return (
      <div style={{ marginTop: "3.5em" }}>
        <Preloader />
      </div>
    );
  }
  if (!counsellors) {
    return (
      <div style={{ marginTop: "3.5em" }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className='chat'>
      <StudUsers
        setActive={setActive}
        setAlert={setAlert}
        users={counsellors}
        active={active}
      />
      <StudMess setAlert={setAlert} messages={messages} active={active} />
    </div>
  );
};

export default StudChat;
