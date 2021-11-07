import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";
import QuesAnsCard from "./QuesAnsCard";
import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const QuizQuesCard = ({ question, quesAns, idx }) => {
  const { ques_no, ques_desc } = question;

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

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
          <h6>{ques_desc}</h6>

          {quesAns[idx].answers.map((item) => {
            return <QuesAnsCard key={item.ans_id} answer={item} />;
          })}
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
QuizQuesCard.propTypes = {
  question: PropTypes.object.isRequired,
  quesAns: PropTypes.array.isRequired,
  idx: PropTypes.number.isRequired,
};

export default QuizQuesCard;
