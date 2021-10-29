import { useEffect, useContext, useState } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import RejectedCard from "../../layout/RejectedCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader";

const Rejected = () => {
  const adminContext = useContext(AdminContext);
  const alertContext = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  const { rejected, loadRejected } = adminContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadRejected();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Preloader />;
  }
  if (!rejected) {
    return <Preloader />;
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
      {rejected.map((item) => {
        return (
          <RejectedCard key={item.coun_id} user={item} setAlert={setAlert} />
        );
      })}
    </div>
  );
};

export default Rejected;
