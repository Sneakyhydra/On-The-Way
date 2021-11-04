import { useEffect, useContext } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudFeedCard from "../../layout/Admin/Feedback/StudFeedCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader/Preloader";
import { Row, Col } from "react-materialize";

const AdminStudFeed = ({ tabKey, tabKeyFeed }) => {
  const adminContext = useContext(AdminContext);
  const alertContext = useContext(AlertContext);

  const { studfeed, loadStudFeed } = adminContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "feedback") {
      if (tabKeyFeed === "studfeed") {
        loadStudFeed();
      }
    }
    // eslint-disable-next-line
  }, [tabKey, tabKeyFeed]);

  if (!studfeed) {
    return (
      <div
        style={{
          marginTop: "3.52em",
        }}
      >
        <Row>
          <Col style={{ marginTop: "3em" }}>
            <Preloader />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginTop: "3.52em",
      }}
    >
      <div
        style={{
          marginTop: "3.5em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {studfeed.map((item) => {
          return (
            <StudFeedCard key={item.feed_id} feed={item} setAlert={setAlert} />
          );
        })}
      </div>
    </div>
  );
};

export default AdminStudFeed;
