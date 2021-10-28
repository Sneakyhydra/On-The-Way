import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from "react";
import AnswersCard from "./AnswersCard";
import { Card, Row, Col, Icon } from "react-materialize";

const QuestionsCard = ({
  editedQuesAns,
  question,
  setAlert,
  cntChanges,
  setCntChanges,
  idx,
}) => {
  const { ques_no, ques_desc, ques_id } = question;
  const [ques, setQues] = useState({
    quesId: ques_id,
    quesNo: ques_no,
    quesDesc: ques_desc,
  });
  const { quesId, quesNo, quesDesc } = ques;

  const changeQues = (e) => {
    M.updateTextFields();

    setQues({ ...ques, [e.target.name]: e.target.value });

    editedQuesAns[idx] = {
      ...editedQuesAns[idx],
      [e.target.name]: e.target.value,
    };

    setCntChanges(cntChanges + 1);
  };

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

  useEffect(() => {
    editedQuesAns[idx].ques_desc = quesDesc;
    editedQuesAns[idx].ques_no = parseInt(quesNo);

    console.log(editedQuesAns[idx]);
    //eslint-disable-next-line
  }, [ques]);

  const totalQues = editedQuesAns.length;
  const totalAns = editedQuesAns[idx].answers.length;

  return (
    <div>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "1000px" }}>
          <Card
            actions={[]}
            className='z-depth-1 question'
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName='black-text'
            title={"Question " + quesNo.toString()}
          >
            <div className='input-field'>
              <textarea
                name='quesDesc'
                id='description'
                className='materialize-textarea'
                value={quesDesc}
                onChange={changeQues}
              />
              <label htmlFor='description'>Description</label>
            </div>

            {editedQuesAns[idx].answers.map((item, aidx) => {
              return (
                <AnswersCard
                  key={item.ans_id}
                  answer={item}
                  setAlert={setAlert}
                  editedQuesAns={editedQuesAns}
                  cntChanges={cntChanges}
                  setCntChanges={setCntChanges}
                  aidx={aidx}
                  idx={idx}
                  totalAns={totalAns}
                  ques={ques}
                  setQues={setQues}
                />
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionsCard;
