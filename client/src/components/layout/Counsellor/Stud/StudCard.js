import { Fragment } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const StudCard = ({ user, setTabKey, setActive }) => {
  const {
    stud_name,
    stud_gender,
    stud_phone,
    stud_dept,
    stud_branch,
    roll_no,
    cpi,
    stud_id,
  } = user;

  let CPI = cpi;

  if (!cpi) {
    CPI = "Not found";
  }

  const chat = () => {
    setActive(stud_id);
    setTabKey("chat");
  };

  return (
    <Row style={{ margin: "0" }}>
      <Col m={6} s={12} style={{ width: "365px" }}>
        <Card
          actions={[
            <a
              href='#!'
              key='1'
              className='waves-effect waves-light btn'
              onClick={chat}
              style={{
                borderRadius: "10px",
                minWidth: "120px",
                width: "auto",
                backgroundColor: "#255F85",
                marginRight: "15px",
              }}
            >
              Chat
            </a>,
          ]}
          className='z-depth-1 grow'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='white-text'
          title={stud_name}
        >
          <Fragment>
            <strong>{roll_no}</strong>
            <br />
            {stud_branch}
            <br />
            {stud_dept}
            <br />
            {stud_gender}
            <br />
            {stud_phone}
            <br />
            Cpi: {CPI}
          </Fragment>
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
StudCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default StudCard;
