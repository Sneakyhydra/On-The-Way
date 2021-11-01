import { useEffect, useContext, useState } from "react";
import CounContext from "../../../context/counsellor/counContext";
import M from "materialize-css/dist/js/materialize.min.js";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import Preloader from "../../layout/Preloader";
import CounMess from "../../layout/CounMess";

const CounChat = () => {
  const counContext = useContext(CounContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { loadMessages, messages, error } = counContext;
  const { setAlert } = alertContext;
  const { loadUser, user } = authContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadMessages();
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

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   let date;
  //   date = new Date();
  //   date =
  //     date.getUTCFullYear() +
  //     "-" +
  //     ("00" + (date.getUTCMonth() + 1)).slice(-2) +
  //     "-" +
  //     ("00" + date.getUTCDate()).slice(-2) +
  //     " " +
  //     ("00" + date.getUTCHours()).slice(-2) +
  //     ":" +
  //     ("00" + date.getUTCMinutes()).slice(-2) +
  //     ":" +
  //     ("00" + date.getUTCSeconds()).slice(-2);

  //   submitQuiz({
  //     quesAns: quiz,
  //     stud_id: user.user_id,
  //     date: date,
  //   });
  //   setAlert("Quiz Submitted", "success");
  //   loadUser();

  //   window.location.reload(false);
  // };

  return (
    <div
      style={{
        marginTop: "5em",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {messages.map((mess) => {
        return <CounMess mess={mess} setAlert={setAlert} />;
      })}
    </div>
  );
};

export default CounChat;
