import { useEffect, useContext, useState } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import CounCard from "../../layout/CounCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader";

const Counsellors = () => {
  const adminContext = useContext(AdminContext);
  const alertContext = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  const { counsellors, loadCounsellors } = adminContext;
  const { setAlert } = alertContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadCounsellors();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Preloader />;
  }
  if (!counsellors) {
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
      <div
        style={{
          marginTop: "3.5em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {counsellors.map((item) => {
          return (
            <CounCard key={item.coun_id} user={item} setAlert={setAlert} />
          );
        })}
      </div>
    </div>
  );
};

export default Counsellors;
