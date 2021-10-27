import M from "materialize-css/dist/js/materialize.min.js";
import { useState, useEffect } from "react";
import { Card, Row, Col, Icon } from "react-materialize";

const AnswersCard = ({
  setAlert,
  answer,
  editedAns,
  totalAns,
  sQAns,
  setSQAns,
  setAnsForUpdate,
  ansForUpdate,
}) => {
  const { ans_id, ans_no, ans_desc, response } = answer;

  const [ans, setAns] = useState({
    ansNo: ans_no,
    ansDesc: ans_desc,
    resp: response,
  });

  const { ansNo, ansDesc, resp } = ans;

  const changeAns = (e) => {
    M.updateTextFields();

    setAns({ ...ans, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    for (let i = 0; i < editedAns.length; i++) {
      if (editedAns[i].ans_id === ans_id) {
        editedAns[i].ans_desc = ansDesc;
        editedAns[i].ans_no = parseInt(ansNo);
        editedAns[i].response = resp;
        break;
      }
    }
    //eslint-disable-next-line
  }, [ans]);

  const moveUp = () => {
    if (ansNo === 1) {
      console.log("do nothing");
    } else {
      let temp1, temp2, idx1, idx2;

      for (let i = 0; i < sQAns.length; i++) {
        if (sQAns[i].ans_no === ansNo) {
          temp1 = sQAns[i].ans_id;
        }
        if (sQAns[i].ans_no === ansNo - 1) {
          temp2 = sQAns[i].ans_id;
        }
      }

      for (let i = 0; i < editedAns.length; i++) {
        if (editedAns[i].ans_id === temp1) {
          idx1 = i;
        }
        if (editedAns[i].ans_id === temp2) {
          idx2 = i;
        }
      }

      [editedAns[idx1].ans_desc, editedAns[idx2].ans_desc] = [
        editedAns[idx2].ans_desc,
        editedAns[idx1].ans_desc,
      ];

      [editedAns[idx1].response, editedAns[idx2].response] = [
        editedAns[idx2].response,
        editedAns[idx1].response,
      ];

      console.log(sQAns);
      console.log(editedAns);

      setAnsForUpdate(ansForUpdate + 1);
    }
  };

  const moveDown = () => {
    if (ansNo === totalAns) {
      console.log("do nothing");
    } else {
      let temp1, temp2, idx1, idx2;

      for (let i = 0; i < sQAns.length; i++) {
        if (sQAns[i].ans_no === ansNo) {
          temp1 = sQAns[i].ans_id;
        }
        if (sQAns[i].ans_no === ansNo + 1) {
          temp2 = sQAns[i].ans_id;
        }
      }

      for (let i = 0; i < editedAns.length; i++) {
        if (editedAns[i].ans_id === temp1) {
          idx1 = i;
        }
        if (editedAns[i].ans_id === temp2) {
          idx2 = i;
        }
      }

      [editedAns[idx1].ans_desc, editedAns[idx2].ans_desc] = [
        editedAns[idx2].ans_desc,
        editedAns[idx1].ans_desc,
      ];

      [editedAns[idx1].response, editedAns[idx2].response] = [
        editedAns[idx2].response,
        editedAns[idx1].response,
      ];
      setAnsForUpdate(ansForUpdate + 1);
    }
  };

  return (
    <div>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "1000px", padding: "0" }}>
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
                  backgroundColor: ansNo === 1 ? "grey" : "#2BC592",
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
                  backgroundColor: ansNo === totalAns ? "grey" : "#2BC592",
                  marginLeft: "15px",
                }}
                onClick={moveDown}
              >
                <Icon>arrow_downward</Icon>
              </a>,
            ]}
            className='z-depth-1 answer'
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName='black-text'
            title={"Answer " + ansNo.toString()}
          >
            <div className='input-field'>
              <textarea
                name='ansDesc'
                id={ans_no.toString() + "1"}
                className='materialize-textarea'
                value={sQAns[ansNo - 1].ans_desc}
                onChange={changeAns}
              />
              <label htmlFor={ans_no.toString() + "1"}>Option</label>
            </div>

            <div className='input-field'>
              <textarea
                name='resp'
                id={ans_no.toString() + "2"}
                className='materialize-textarea'
                value={sQAns[ansNo - 1].response}
                onChange={changeAns}
              />
              <label htmlFor={ans_no.toString() + "2"}>Response</label>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnswersCard;
