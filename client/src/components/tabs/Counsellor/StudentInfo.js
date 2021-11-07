import { useEffect, useContext } from "react";
import CounContext from "../../../context/counsellor/counContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudCard from "../../layout/Counsellor/Stud/StudCard";
import Preloader from "../../layout/Preloader/Preloader";

const StudentInfo = ({ tabKey, setTabKey, setActive }) => {
  const counContext = useContext(CounContext);
  const { students, loadStudents } = counContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "studentInfo") {
      loadStudents();
    }
    // eslint-disable-next-line
  }, [tabKey]);

  if (!students) {
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
      {students.map((item) => {
        return (
          <StudCard
            key={item.stud_id}
            user={item}
            setTabKey={setTabKey}
            setActive={setActive}
          />
        );
      })}
    </div>
  );
};

export default StudentInfo;
