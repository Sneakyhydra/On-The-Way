import { Fragment } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const StudCounCard = ({ user, setTabKey, setActive }) => {
  const { coun_name, coun_gender, coun_phone, coun_dept, coun_id } = user;

  const chat = () => {
    setActive(coun_id);
    setTabKey("studchat");
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
StudCounCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default StudCounCard;
