import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth/authContext";
import EditAdmin from "./EditAdmin";
import EditStudent from "./EditStudent";
import EditCounsellor from "./EditCounsellor";
import Preloader from "../../layout/Preloader";

const EditProfile = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Load the user when dashboard is rendered
  useEffect(() => {
    const fetchUser = async () => {
      await authContext.loadUser();
      setLoading(false);
    };
    fetchUser();
    // eslint-disable-next-line
  }, [loading]);

  const user = authContext.user;

  if (loading) {
    return <Preloader />;
  }
  if (!user) {
    return <Preloader />;
  }

  const { role } = user;

  if (role === "admin") {
    return <EditAdmin user={user} />;
  } else if (role === "student") {
    return <EditStudent user={user} />;
  } else if (role === "counsellor") {
    return <EditCounsellor user={user} />;
  }
};

export default EditProfile;
