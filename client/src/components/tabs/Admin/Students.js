import { useEffect, useContext, useState } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";
import StudCard from "../../layout/Admin/Stud/StudCard";
import Preloader from "../../layout/Preloader/Preloader";

const Students = () => {
  const adminContext = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  const { students, loadStudents } = adminContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    loadStudents();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Preloader />;
  }
  if (!students) {
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
      {students.map((item) => {
        return <StudCard key={item.stud_id} user={item} />;
      })}
    </div>
  );
};

export default Students;
