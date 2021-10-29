import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from "react";
import { Card, Row, Col, Icon } from "react-materialize";

const AnswersCard = ({
  answer,
  editedQuesAns,
  setCntChanges,
  cntChanges,
  aidx,
  idx,
  ques,
  setQues,
}) => {
  const { ans_no, ans_desc, response, ans_id } = answer;
  const [ans, setAns] = useState({
    ansId: ans_id,
    ansNo: ans_no,
    ansDesc: ans_desc,
    resp: response,
  });
  const { ansNo, ansDesc, resp } = ans;

  const changeAns = (e) => {
    M.updateTextFields();

    setAns({ ...ans, [e.target.name]: e.target.value });

    editedQuesAns[idx].answers[aidx] = {
      ...editedQuesAns[idx].answers[aidx],
      [e.target.name]: e.target.value,
    };
  };

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

  useEffect(() => {
    editedQuesAns[idx].answers[aidx].ans_desc = ansDesc;
    editedQuesAns[idx].answers[aidx].ans_no = parseInt(ansNo);
    editedQuesAns[idx].answers[aidx].response = resp;
    setQues({
      ...ques,
      ques_no: ques.ques_no,
      ques_desc: ques.ques_desc + "",
    });
    setCntChanges(cntChanges + 1);

    console.log(editedQuesAns[idx]);
    console.log(editedQuesAns[idx].answers[aidx]);
    //eslint-disable-next-line
  }, [ans]);

  return (
    <div>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "1000px", padding: "0" }}>
          <Card
            actions={[]}
            className='z-depth-1 answer'
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName='black-text'
            title={"Answer " + ansNo.toString()}
          >
            <div className='input-field'>
              <textarea
                name='ansDesc'
                id={ansNo.toString() + "1"}
                className='materialize-textarea'
                value={ansDesc}
                onChange={changeAns}
              />
              <label htmlFor={ansNo.toString() + "1"}>Option</label>
            </div>

            <div className='input-field'>
              <textarea
                name='resp'
                id={ansNo.toString() + "2"}
                className='materialize-textarea'
                value={resp}
                onChange={changeAns}
              />
              <label htmlFor={ansNo.toString() + "2"}>Response</label>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnswersCard;
