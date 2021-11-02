import { Card, Row, Col, Icon } from "react-materialize";
import PropTypes from "prop-types";

const StudFeedCard = ({ feed }) => {
  return (
    <Row style={{ margin: "0" }}>
      <Col m={6} s={12} style={{ width: "300px" }}>
        <Card
          className='z-depth-1 grow'
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName='white-text'
          title={feed.stud_name}
        >
          <strong>{feed.feed_desc}</strong>
        </Card>
      </Col>
    </Row>
  );
};

// Set proptypes
StudFeedCard.propTypes = {
  feed: PropTypes.object.isRequired,
};

export default StudFeedCard;
