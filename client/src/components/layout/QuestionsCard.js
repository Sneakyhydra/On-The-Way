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
  ansForUpdate,
  setAnsForUpdate,
}) => {
  const { ques_desc, ques_no, ques_id } = question;

  const [ques, setQues] = useState({
    quesNo: ques_no,
    quesDesc: ques_desc,
  });

  const [sQAns, setSQAns] = useState(answers);

  const compare = (a, b) => {
    if (a.ans_no < b.ans_no) {
      return -1;
    }
    if (a.ans_no > b.ans_no) {
      return 1;
    }
    return 0;
  };

  const { quesNo, quesDesc } = ques;

  const changeQues = (e) => {
    M.updateTextFields();

    setQues({ ...ques, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
    answers.sort(compare);
    setSQAns(answers);
  }, [sQAns, answers]);

  useEffect(() => {
    for (let i = 0; i < editedQues.length; i++) {
      if (editedQues[i].ques_id === ques_id) {
        editedQues[i].ques_desc = quesDesc;
        editedQues[i].ques_no = parseInt(quesNo);
        break;
      }
    }
    //eslint-disable-next-line
  }, [ques]);

  const ansLength = answers.length;
  const quesLength = editedQues.length;

  const moveUp = () => {
    if (quesNo === 1) {
      console.log("do nothing");
    } else {
      let idx1, idx2;

      for (let i = 0; i < editedQues.length; i++) {
        if (editedQues[i].ques_no === ques_no) {
          idx1 = i;
        }
        if (editedQues[i].ques_no === ques_no - 1) {
          idx2 = i;
        }
      }

      [editedQues[idx1].ques_id, editedQues[idx2].ques_id] = [
        editedQues[idx2].ques_id,
        editedQues[idx1].ques_id,
      ];

      console.log(editedQues);

      setAnsForUpdate(ansForUpdate + 1);
    }
  };
  const moveDown = () => {
    if (quesNo === editedQues.length) {
      console.log("do nothing");
    } else {
      let idx1, idx2;

      for (let i = 0; i < editedQues.length; i++) {
        if (editedQues[i].ques_no === ques_no) {
          idx1 = i;
        }
        if (editedQues[i].ques_no === ques_no + 1) {
          idx2 = i;
        }
      }

      [editedQues[idx1].ques_id, editedQues[idx2].ques_id] = [
        editedQues[idx2].ques_id,
        editedQues[idx1].ques_id,
      ];

      // [editedQues[idx1].ques_no, editedQues[idx2].ques_no] = [
      //   editedQues[idx2].ques_no,
      //   editedQues[idx1].ques_no,
      // ];

      console.log(editedQues);

      setAnsForUpdate(ansForUpdate + 1);
    }
  };

  return (
    <div>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "1000px" }}>
          <Card
            actions={[
              <a
                href='#!'
                key='1'
                className='waves-effect waves-light btn'
                style={{
                  borderRadius: "10px",
                  minWidth: "120px",
                  width: "auto",
                  backgroundColor: quesNo === 1 ? "grey" : "#2BC592",
                  marginRight: "15px",
                }}
                onClick={moveUp}
              >
                <Icon>arrow_upward</Icon>
              </a>,
              <a
                href='#!'
                key='2'
                className='waves-effect waves-light btn'
                style={{
                  borderRadius: "10px",
                  minWidth: "120px",
                  width: "auto",
                  backgroundColor: quesNo === quesLength ? "grey" : "#2BC592",
                  marginLeft: "15px",
                }}
                onClick={moveDown}
              >
                <Icon>arrow_downward</Icon>
              </a>,
            ]}
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

            {answers.map((item) => {
              return (
                <AnswersCard
                  key={item.ans_id}
                  answer={item}
                  setAlert={setAlert}
                  editedAns={editedAns}
                  totalAns={ansLength}
                  sQAns={sQAns}
                  setSQAns={setSQAns}
                  ansForUpdate={ansForUpdate}
                  setAnsForUpdate={setAnsForUpdate}
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
