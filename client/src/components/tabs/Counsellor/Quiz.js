import { useEffect, useContext, useState } from "react";
import CounContext from "../../../context/counsellor/counContext";
import M from "materialize-css/dist/js/materialize.min.js";
import QuizQuesCard from "../../layout/QuizQuesCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader";

const Quiz = () => {
  const counContext = useContext(CounContext);
  const alertContext = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  const { quesAns, loadQuesAns, error } = counContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    loadQuesAns();
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
  if (!quesAns) {
    return <Preloader />;
  }

  return (
    <div
      className='col s12'
      style={{
        marginTop: "3.5em",
        width: "100%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#2bc592",
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

export default Quiz;
