import { Fragment } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const StudCard = ({ user }) => {
  const {
    stud_name,
    stud_gender,
    stud_phone,
    stud_dept,
    stud_branch,
    roll_no,
    cpi,
  } = user;

  let CPI = cpi;

  if (!cpi) {
    CPI = "Not found";
  }

  return (
    <Row style={{ margin: "0" }}>
      <Col m={6} s={12} style={{ width: "365px" }}>
        <Card
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
