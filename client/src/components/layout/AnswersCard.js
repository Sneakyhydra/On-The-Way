import M from "materialize-css/dist/js/materialize.min.js";
import { Fragment, useState, useEffect } from "react";

const AnswersCard = ({ setAlert, answer, options, setOptions, editedAns }) => {
  const { ans_id, ans_no, ans_desc, response } = answer;

  const [ans, setAns] = useState({
    ansNo: ans_no,
    ansDesc: ans_desc,
    resp: response,
  });

  const { ansNo, ansDesc, resp } = ans;

  const changeAns = (e) => {
    M.updateTextFields();

    setAns({ ...ans, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    for (let i = 0; i < editedAns.length; i++) {
      if (editedAns[i].ans_id === ans_id) {
        editedAns[i].ans_desc = ansDesc;
        editedAns[i].ans_no = parseInt(ansNo);
        editedAns[i].response = resp;
        break;
      }
    }
    console.log(editedAns);
    //eslint-disable-next-line
  }, [ans]);

  return (
    <div>
      <input type='number' name='ansNo' value={ansNo} onChange={changeAns} />
      <input type='text' name='ansDesc' value={ansDesc} onChange={changeAns} />
      <input type='text' name='resp' value={resp} onChange={changeAns} />
    </div>
  );
};

export default AnswersCard;
