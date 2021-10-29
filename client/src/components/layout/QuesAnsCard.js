import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";
import { Card, Row, Col, Icon } from "react-materialize";

const QuesAnsCard = ({ answer }) => {
  const { ans_no, ans_desc, response } = answer;

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

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
            title={"Answer " + ans_no.toString()}
          >
            <div className='input-field'>
              <textarea
                name='ans_desc'
                id={ans_no.toString() + "1"}
                className='materialize-textarea'
                value={ans_desc}
                disabled
              />
              <label htmlFor={ans_no.toString() + "1"}>Option</label>
            </div>

            <div className='input-field'>
              <textarea
                name='resp'
                id={ans_no.toString() + "2"}
                className='materialize-textarea'
                value={response}
                disabled
              />
              <label htmlFor={ans_no.toString() + "2"}>Response</label>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default QuesAnsCard;
