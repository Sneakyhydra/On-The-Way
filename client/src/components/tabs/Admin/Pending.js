import { useEffect, useContext, useState } from "react";
import AdminContext from "../../../context/admin/adminContext";
import M from "materialize-css/dist/js/materialize.min.js";

const Pending = () => {
  const adminContext = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  const { pending } = adminContext;

  // Load the user when dashboard is rendered
  useEffect(() => {
    adminContext.loadPending();
    setLoading(false);
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return "loading";
  }
  if (!pending) {
    return "loading";
  }

  return (
    <div>
      <ul>
        {pending.map((item) => {
          return <li>{item.coun_name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Pending;
