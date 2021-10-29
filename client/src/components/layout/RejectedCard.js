import { Fragment, useContext } from "react";
import { Card, Row, Col, Icon } from "react-materialize";
import AdminContext from "../../context/admin/adminContext";

const RejectedCard = ({ user, setAlert }) => {
  const { coun_name, coun_gender, coun_phone, coun_dept, coun_id } = user;
  const adminContext = useContext(AdminContext);

  const { approveCoun } = adminContext;

  const approve = () => {
    approveCoun(coun_id);
    setAlert("Approved", "success");
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Row style={{ margin: "0" }}>
        <Col m={6} s={12} style={{ width: "400px" }}>
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
                  backgroundColor: "#2BC592",
                  marginRight: "15px",
                }}
                onClick={approve}
              >
                <Icon>check</Icon>
              </a>,
            ]}
            className='z-depth-1'
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

export default RejectedCard;
