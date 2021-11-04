import { useEffect, useContext } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudCard from "../../layout/Admin/Stud/StudCard";
import Preloader from "../../layout/Preloader/Preloader";

const Students = ({ tabKey }) => {
  const adminContext = useContext(AdminContext);
  const { students, loadStudents } = adminContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabKey === "students") {
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
        return <StudCard key={item.stud_id} user={item} />;
      })}
    </div>
  );
};

export default Students;
