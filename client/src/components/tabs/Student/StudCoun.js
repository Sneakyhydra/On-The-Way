import { useEffect, useContext, useState } from "react";
import StudContext from "../../../context/student/studContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudCounCard from "../../layout/Student/Coun/StudCounCard";
import Preloader from "../../layout/Preloader/Preloader";

const StudCoun = () => {
  const studContext = useContext(StudContext);
  const [loading, setLoading] = useState(true);

  const { counsellors, loadCounsellors } = studContext;

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
        marginTop: "5em",
      }}
    >
      {counsellors.map((item) => {
        return <StudCounCard key={item.coun_id} user={item} />;
      })}
    </div>
  );
};

export default StudCoun;
