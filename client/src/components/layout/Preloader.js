import { Row, Col, ProgressBar } from "react-materialize";

const Preloader = () => {
  return (
    <Row>
      <Col s={12}>
        <ProgressBar />
      </Col>
    </Row>
  );
};

export default Preloader;
