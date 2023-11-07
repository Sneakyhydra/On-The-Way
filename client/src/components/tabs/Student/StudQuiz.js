import { useEffect, useContext, useState } from "react";
import StudContext from "../../../context/student/studContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudQuesCard from "../../layout/Student/Quiz/StudQuesCard";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import Preloader from "../../layout/Preloader/Preloader";

const StudQuiz = ({ tabKey, setTabKey }) => {
  const studContext = useContext(StudContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { quesAns, loadQuesAns, error, submitQuiz } = studContext;
  const { setAlert } = alertContext;
  const { user, loadUser } = authContext;

  const [quiz, setQuiz] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    if (submitted === true) {
      setTabKey("profile");
    }
    setSubmitted(false);
    // eslint-disable-next-line
  }, [submitted]);

  useEffect(() => {
    if (tabKey === "studquiz") {
      loadQuesAns();
    }
    // eslint-disable-next-line
  }, [tabKey]);

  if (!quesAns) {
    return (
      <div style={{ marginTop: "3.5em" }}>
        <Preloader />
      </div>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();

    let date;
    date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2);

    submitQuiz({
      quesAns: quiz,
      stud_id: user.user_id,
      date: date,
    });
    setAlert("Quiz Submitted", "success");
    loadUser();

    setQuiz({});
    setSubmitted(true);
  };

  return (
    <form
      className='col s12'
      style={{
        marginTop: "3.5em",
        width: "100%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#DDC8C4",
        textAlign: "center",
      }}
      onSubmit={onSubmit}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {quesAns.map((item, idx) => {
          return (
            <StudQuesCard
              quesAns={quesAns}
              key={item.ques_id}
              question={item}
              idx={idx}
              quiz={quiz}
              setQuiz={setQuiz}
              submitted={submitted}
            />
          );
        })}
      </div>
      <button
        type='submit'
        className='waves-effect waves-light btn save-quiz z-depth-0'
        style={{
          borderRadius: "1rem",
          width: "10em",
          border: "2px solid #2C363F",
          fontWeight: "bolder",
          fontSize: "18px",
          margin: "2em 0",
          lineHeight: "18px",
          textTransform: "capitalize",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default StudQuiz;
