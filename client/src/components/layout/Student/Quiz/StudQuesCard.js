import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect, useState } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const StudQuesCard = ({ quesAns, question, idx, quiz, setQuiz, submitted }) => {
  const { ques_no, ques_desc, ques_id } = question;

  const [ans, setAns] = useState(0);

  const onChange = (e) => {
    M.updateTextFields();
    setAns(parseInt(e.target.value));

    setQuiz({ ...quiz, [ques_id]: parseInt(e.target.value) });
  };

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

  useEffect(() => {
    if (submitted === true) {
      setAns(0);
    }
    // eslint-disable-next-line
  }, [submitted]);

  return (
    <Row style={{ margin: "0" }}>
      <Col
        m={6}
        s={12}
        style={{
          width: "70vw",
          textAlign: "center",
          margin: "0",
          marginTop: "3rem",
        }}
      >
        <Card
          className='z-depth-1 question'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='black-text'
          title={"Question " + ques_no.toString()}
        >
          <Row>
            <h5>{ques_desc}</h5>
          </Row>

          <Row style={{ textAlign: "left", marginLeft: "0.75rem" }}>
            {quesAns[idx].answers.map((item, aidx) => {
              return (
                <p key={item.ans_id}>
                  <label>
                    <input
                      className='with-gap'
                      name={ques_id}
                      type='radio'
                      value={item.ans_id}
                      checked={ans === item.ans_id}
                      onChange={onChange}
                      required
                    />
                    <span style={{ color: "black" }}>{item.ans_desc}</span>
                  </label>
                </p>
              );
            })}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
StudQuesCard.propTypes = {
  quesAns: PropTypes.array.isRequired,
  question: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  quiz: PropTypes.object.isRequired,
  setQuiz: PropTypes.func.isRequired,
};

export default StudQuesCard;
