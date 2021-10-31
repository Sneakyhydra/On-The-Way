import { useEffect, useContext, useState } from "react";
import StudContext from "../../../context/student/studContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudCounCard from "../../layout/student/StudCounCard";
import AlertContext from "../../../context/alert/alertContext";
import Preloader from "../../layout/Preloader";

const StudCoun = () => {
  const studContext = useContext(StudContext);
  const alertContext = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  const { counsellors, loadCounsellors } = studContext;
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
      }}
    >
      {counsellors.map((item) => {
        return (
          <StudCounCard key={item.coun_id} user={item} setAlert={setAlert} />
        );
      })}
    </div>
  );
};

export default StudCoun;
