import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from "react";
import { Card, Row, Col, Icon, Textarea } from "react-materialize";
import PropTypes from "prop-types";

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
    M.AutoInit();
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

    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, [ans]);

  return (
    <Row
      style={{
        margin: "auto",
        width: "55vw",
        padding: "0",
        marginBottom: "0",
        marginTop: "0",
      }}
    >
      <Col
        m={6}
        s={12}
        style={{
          width: "55vw",
          padding: "0",
          marginBottom: "0",
          marginTop: "0",
        }}
      >
        <Card
          className='z-depth-1 answer'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='black-text'
          title={"Answer " + ansNo.toString()}
        >
          <Row>
            <Textarea
              name='ansDesc'
              id={ans_id.toString() + "1"}
              value={ansDesc}
              onChange={changeAns}
              label='Option'
              data-length={500}
              placeholder='Option'
            />
          </Row>

          <Row>
            <Textarea
              name='resp'
              id={ans_id.toString() + "2"}
              value={resp}
              onChange={changeAns}
              label='Response'
              data-length={500}
              placeholder='Response'
            />
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
AnswersCard.propTypes = {
  answer: PropTypes.object.isRequired,
  editedQuesAns: PropTypes.array.isRequired,
  setCntChanges: PropTypes.func.isRequired,
  cntChanges: PropTypes.number.isRequired,
  aidx: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  ques: PropTypes.object.isRequired,
  setQues: PropTypes.func.isRequired,
};

export default AnswersCard;
