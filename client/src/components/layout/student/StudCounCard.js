import { Fragment } from "react";
import { Card, Row, Col, Icon } from "react-materialize";

const StudCounCard = ({ user }) => {
  const { coun_name, coun_gender, coun_phone, coun_dept } = user;

  return (
    <Row style={{ margin: "0" }}>
      <Col m={6} s={12} style={{ width: "400px" }}>
        <Card
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

export default StudCounCard;
