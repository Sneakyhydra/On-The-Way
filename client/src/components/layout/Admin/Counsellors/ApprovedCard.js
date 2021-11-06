import { Fragment, useContext } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import AdminContext from "../../../../context/admin/adminContext";
import PropTypes from "prop-types";

const ApprovedCard = ({ user, setAlert }) => {
  const { coun_name, coun_gender, coun_phone, coun_dept, coun_id } = user;
  const adminContext = useContext(AdminContext);

  const { rejectCoun } = adminContext;

  const reject = () => {
    rejectCoun(coun_id);
    setAlert("Rejected", "danger");
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
              style={{
                borderRadius: "10px",
                minWidth: "120px",
                width: "auto",
                backgroundColor: "#D7263D",
                marginLeft: "160px",
              }}
              onClick={reject}
            >
              <Icon>clear</Icon>
            </a>,
          ]}
          className='z-depth-1 grow'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='white-text'
          title={coun_name}
        >
          <Fragment>
            <strong>{coun_dept}</strong>
            <br />
            {coun_gender}
            <br />
            {coun_phone}
          </Fragment>
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
ApprovedCard.propTypes = {
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default ApprovedCard;
