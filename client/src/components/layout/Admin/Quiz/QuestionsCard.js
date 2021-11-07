import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from "react";
import AnswersCard from "./AnswersCard";
import { Card, Row, Col, Icon, Textarea } from "react-materialize";
import PropTypes from "prop-types";

const QuestionsCard = ({
  editedQuesAns,
  question,
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
  const { quesNo, quesDesc } = ques;

  const changeQues = (e) => {
    M.AutoInit();
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

    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, [ques]);

  return (
    <Row style={{ margin: "0" }}>
      <Col
        m={6}
        s={12}
        style={{ width: "70vw", textAlign: "center", margin: "0" }}
      >
        <Card
          className='z-depth-1 question'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='black-text'
          title={"Question " + quesNo.toString()}
        >
          <Row>
            <Textarea
              name='quesDesc'
              id={ques_id.toString()}
              value={quesDesc}
              onChange={changeQues}
              label='Description'
              data-length={500}
              placeholder='Description'
            />
          </Row>

          {editedQuesAns[idx].answers.map((item, aidx) => {
            return (
              <AnswersCard
                key={item.ans_id}
                answer={item}
                editedQuesAns={editedQuesAns}
                cntChanges={cntChanges}
                setCntChanges={setCntChanges}
                aidx={aidx}
                idx={idx}
                ques={ques}
                setQues={setQues}
              />
            );
          })}
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
QuestionsCard.propTypes = {
  editedQuesAns: PropTypes.array.isRequired,
  question: PropTypes.object.isRequired,
  cntChanges: PropTypes.number.isRequired,
  setCntChanges: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};

export default QuestionsCard;
