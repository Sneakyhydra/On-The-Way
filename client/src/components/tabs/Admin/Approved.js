import { useEffect, useContext } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import ApprovedCard from "../../layout/Admin/Counsellors/ApprovedCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader/Preloader";
import { Row, Col } from "react-materialize";

const Approved = ({ tabKey, tabKeyCoun }) => {
  const adminContext = useContext(AdminContext);
  const alertContext = useContext(AlertContext);

  const { approved, loadApproved } = adminContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "counsellors") {
      if (tabKeyCoun === "approved") {
        loadApproved();
      }
    }
    // eslint-disable-next-line
  }, [tabKey, tabKeyCoun]);

  if (!approved) {
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
        {approved.map((item) => {
          return (
            <ApprovedCard key={item.coun_id} user={item} setAlert={setAlert} />
          );
        })}
      </div>
    </div>
  );
};

export default Approved;
