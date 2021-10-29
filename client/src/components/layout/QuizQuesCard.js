import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";
import QuesAnsCard from "./QuesAnsCard";
import { Card, Row, Col, Icon } from "react-materialize";

const QuizQuesCard = ({ question, quesAns, idx }) => {
  const { ques_no, ques_desc } = question;

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

  return (
    <div>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "40vw" }}>
          <Card
            actions={[]}
            className='z-depth-1 question'
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName='black-text'
            title={"Question " + ques_no.toString()}
          >
            <div className='input-field'>
              <textarea
                name='ques_desc'
                id='description'
                className='materialize-textarea'
                value={ques_desc}
                disabled
              />
              <label htmlFor='description'>Description</label>
            </div>

            {quesAns[idx].answers.map((item) => {
              return <QuesAnsCard key={item.ans_id} answer={item} />;
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default QuizQuesCard;
