import { useEffect, useContext } from "react";
import CounContext from "../../../context/counsellor/counContext";
import M from "materialize-css/dist/js/materialize.min.js";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader/Preloader";
import CounMess from "../../layout/Counsellor/Chat/CounMess";
import CounUsers from "../../layout/Counsellor/Chat/CounUsers";

const CounChat = ({ tabKey, active, setActive }) => {
  const counContext = useContext(CounContext);
  const alertContext = useContext(AlertContext);

  const { loadMessages, messages, error, students, loadStudents } = counContext;
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
    if (tabKey === "chat") {
      loadStudents();
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
  if (!students) {
    return (
      <div style={{ marginTop: "3.5em" }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className='chat'>
      <CounUsers
        setActive={setActive}
        setAlert={setAlert}
        users={students}
        active={active}
      />
      <CounMess setAlert={setAlert} messages={messages} active={active} />
    </div>
  );
};

export default CounChat;
