import { useEffect, useContext, useState } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import QuestionsCard from "../../layout/QuestionsCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader";

const Questions = () => {
  const adminContext = useContext(AdminContext);
  const alertContext = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  const { questions, loadQues, answers, loadAns } = adminContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadQues();
    loadAns();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  let editedQues = [];
  let editedAns = [];

  if (loading) {
    return <Preloader />;
  }
  if (!questions) {
    return <Preloader />;
  }
  if (!answers) {
    return <Preloader />;
  }

  const compare = (a, b) => {
    if (a.ques_no < b.ques_no) {
      return -1;
    }
    if (a.ques_no > b.ques_no) {
      return 1;
    }
    return 0;
  };

  questions.sort(compare);

  editedQues = [...questions];
  editedAns = [...answers];

  return (
    <form className='col s6'>
      {questions.map((item) => {
        return (
          <QuestionsCard
            editedQues={editedQues}
            editedAns={editedAns}
            key={item.ques_id}
            question={item}
            setAlert={setAlert}
            answers={answers.filter((ans) => {
              return ans.ques_id === item.ques_id;
            })}
          />
        );
      })}
    </form>
  );
};

export default Questions;
