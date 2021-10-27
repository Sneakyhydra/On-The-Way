import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from "react";
import AnswersCard from "./AnswersCard";
import { Card, Row, Col, Icon } from "react-materialize";

const QuestionsCard = ({
  editedQues,
  editedAns,
  question,
  setAlert,
  answers,
}) => {
  const { ques_desc, ques_no, ques_id } = question;

  const [ques, setQues] = useState({
    quesNo: ques_no,
    quesDesc: ques_desc,
  });

  const { quesNo, quesDesc } = ques;

  const changeQues = (e) => {
    M.updateTextFields();

    setQues({ ...ques, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    for (let i = 0; i < editedQues.length; i++) {
      if (editedQues[i].ques_id === ques_id) {
        editedQues[i].ques_desc = quesDesc;
        editedQues[i].ques_no = parseInt(quesNo);
        break;
      }
    }
    console.log(editedQues);
    //eslint-disable-next-line
  }, [ques]);

  const compare = (a, b) => {
    if (a.ans_no < b.ans_no) {
      return -1;
    }
    if (a.ans_no > b.ans_no) {
      return 1;
    }
    return 0;
  };

  answers.sort(compare);

  return (
    <div>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "200px" }}>
          <Card
            actions={[]}
            className='z-depth-1'
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName='black-text'
            title={quesNo.toString()}
          >
            <input
              type='text'
              name='quesDesc'
              value={quesDesc}
              onChange={changeQues}
            />

            {answers.map((item) => {
              return (
                <AnswersCard
                  key={item.ans_id}
                  answer={item}
                  setAlert={setAlert}
                  editedAns={editedAns}
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
