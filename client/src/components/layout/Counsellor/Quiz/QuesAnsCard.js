import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const QuesAnsCard = ({ answer }) => {
  const { ans_no, ans_desc, response } = answer;

  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  }, []);

  return (
    <Row
      style={{
        margin: "auto",
        width: "55vw",
        padding: "0",
        textAlign: "left",
      }}
    >
      <Col m={6} s={12} style={{ width: "55vw", padding: "0" }}>
        <Card
          className='z-depth-1 answer'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='black-text'
          title={"Answer " + ans_no.toString()}
        >
          <div>
            <label
              htmlFor={ans_no.toString() + "1"}
              style={{ fontSize: "16px", color: "grey" }}
            >
              Option
            </label>
            <p id={ans_no.toString() + "1"}>{ans_desc}</p>
          </div>

          <br />

          <div>
            <label
              htmlFor={ans_no.toString() + "2"}
              style={{ fontSize: "16px", color: "grey" }}
            >
              Response
            </label>
            <p id={ans_no.toString() + "2"}>{response}</p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
QuesAnsCard.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default QuesAnsCard;
