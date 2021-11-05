import { useEffect, useContext } from "react";
import CounContext from "../../../context/counsellor/counContext";
import M from "materialize-css/dist/js/materialize.min.js";
import QuizQuesCard from "../../layout/Counsellor/Quiz/QuizQuesCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader/Preloader";

const CounQuiz = ({ tabKey }) => {
  const counContext = useContext(CounContext);
  const alertContext = useContext(AlertContext);

  const { quesAns, loadQuesAns, error } = counContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();

    if (error) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "counquiz") {
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

  return (
    <div
      className='col s12'
      style={{
        marginTop: "1.5em",
        width: "100%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
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
            <QuizQuesCard
              key={item.ques_id}
              question={item}
              quesAns={quesAns}
              idx={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CounQuiz;
