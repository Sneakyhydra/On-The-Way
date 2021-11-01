import { Fragment, useContext } from "react";
import { Card, Row, Col, Icon } from "react-materialize";

const CounMess = ({ mess, setAlert }) => {
  const { coun_id, stud_id, from_role, mess_desc, mess_date } = mess;

  return (
    <Row style={{ margin: "0" }}>
      <Col m={6} s={12} style={{ width: "400px" }}>
        <Card
          className='z-depth-1'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='white-text'
          title={
            from_role === "counsellor" ? "From: " + coun_id : "From: " + stud_id
          }
        >
          <Fragment>
            <strong>
              {from_role === "counsellor" ? "To: " + stud_id : "To: " + coun_id}
            </strong>
            <br />
            {mess_desc}
            <br />
            {mess_date.slice(0, 10)} {mess_date.slice(11, 19)}
          </Fragment>
        </Card>
      </Col>
    </Row>
  );
};

export default CounMess;
