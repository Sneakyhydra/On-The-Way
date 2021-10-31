import { Fragment, useContext } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import StudContext from "../../../context/student/studContext";

const StudCounCard = ({ user, setAlert }) => {
  const { coun_name, coun_gender, coun_phone, coun_dept, coun_id } = user;
  const studContext = useContext(StudContext);

  return (
    <div style={{ marginTop: "5rem" }}>
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
    </div>
  );
};

export default StudCounCard;
