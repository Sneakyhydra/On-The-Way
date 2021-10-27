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

  const { questions, loadQues, answers, loadAns, updateQuiz, error } =
    adminContext;
  const { setAlert } = alertContext;
  const [ansForUpdate, setAnsForUpdate] = useState(0);

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadQues();
    loadAns();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();

    if (error) {
      setAlert(error, "danger");
    }
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

  const onSubmit = (e) => {
    e.preventDefault();
    const editedQuiz = {
      questions: editedQues,
      answers: editedAns,
    };

    updateQuiz(editedQuiz);
    setAlert("Quiz Updated", "success");
  };

  return (
    <form
      className='col s12'
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "5em",
        marginBottom: "5em",
        width: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      onSubmit={onSubmit}
    >
      {editedQues.map((item) => {
        return (
          <QuestionsCard
            editedQues={editedQues}
            editedAns={editedAns}
            key={item.ques_id}
            question={item}
            setAlert={setAlert}
            ansForUpdate={ansForUpdate}
            setAnsForUpdate={setAnsForUpdate}
            answers={editedAns.filter((ans) => {
              return ans.ques_id === item.ques_id;
            })}
          />
        );
      })}
      <button type='submit' className='waves-effect waves-light btn'>
        Save
      </button>
    </form>
  );
};

export default Questions;
