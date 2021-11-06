import { useEffect, useContext } from "react";
import StudContext from "../../../context/student/studContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudCounCard from "../../layout/Student/Coun/StudCounCard";
import Preloader from "../../layout/Preloader/Preloader";

const StudCoun = ({ tabKey, setTabKey, setActive }) => {
  const studContext = useContext(StudContext);
  const { counsellors, loadCounsellors } = studContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "studcoun") {
      loadCounsellors();
    }
    // eslint-disable-next-line
  }, [tabKey]);

  if (!counsellors) {
    return (
      <div style={{ marginTop: "3.5em" }}>
        <Preloader />
      </div>
    );
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
        return (
          <StudCounCard
            key={item.coun_id}
            user={item}
            setTabKey={setTabKey}
            setActive={setActive}
          />
        );
      })}
    </div>
  );
};

export default StudCoun;
