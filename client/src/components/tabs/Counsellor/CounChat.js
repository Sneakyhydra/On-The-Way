import { useEffect, useContext, useState } from "react";
import CounContext from "../../../context/counsellor/counContext";
import M from "materialize-css/dist/js/materialize.min.js";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader";
import CounMess from "../../layout/CounMess";
import CounUsers from "../../layout/CounUsers";

const CounChat = () => {
  const counContext = useContext(CounContext);
  const alertContext = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  const { loadMessages, messages, error, students, loadStudents } = counContext;
  const { setAlert } = alertContext;

  const [active, setActive] = useState(0);

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadMessages();
    loadStudents();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();

    if (error) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }
  if (!messages) {
    return <Preloader />;
  }
  if (!students) {
    return <Preloader />;
  }

  return (
    <div
      style={{
        marginTop: "5em",
        width: "80%",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        border: "3px solid black",
        marginLeft: "10%",
        height: "600px",
      }}
    >
      <CounUsers setActive={setActive} setAlert={setAlert} users={students} />
      <CounMess setAlert={setAlert} messages={messages} active={active} />
    </div>
  );
};

export default CounChat;
