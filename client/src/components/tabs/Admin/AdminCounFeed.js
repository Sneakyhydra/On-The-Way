import { useEffect, useContext } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import CounFeedCard from "../../layout/Admin/Feedback/CounFeedCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader/Preloader";
import { Row, Col } from "react-materialize";

const AdminCounFeed = ({ tabKey, tabKeyFeed }) => {
  const adminContext = useContext(AdminContext);
  const alertContext = useContext(AlertContext);

  const { counfeed, loadCounFeed } = adminContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "feedback") {
      if (tabKeyFeed === "counfeed") {
        loadCounFeed();
      }
    }
    // eslint-disable-next-line
  }, [tabKey, tabKeyFeed]);

  if (!counfeed) {
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
        {counfeed.map((item) => {
          return (
            <CounFeedCard key={item.feed_id} feed={item} setAlert={setAlert} />
          );
        })}
      </div>
    </div>
  );
};

export default AdminCounFeed;
