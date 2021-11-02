import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/auth/authContext";
import DisplayAdmin from "./DisplayAdmin";
import DisplayStudent from "./DisplayStudent";
import DisplayCounsellor from "./DisplayCounsellor";
import EditAdmin from "../Edit/EditAdmin";
import EditStudent from "../Edit/EditStudent";
import EditCounsellor from "../Edit/EditCounsellor";
import Preloader from "../../Preloader/Preloader";

const DisplayProfile = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

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

  if (edit) {
    if (role === "admin") {
      return <EditAdmin user={user} setEdit={setEdit} />;
    } else if (role === "student") {
      return <EditStudent user={user} setEdit={setEdit} />;
    } else if (role === "counsellor") {
      return <EditCounsellor user={user} setEdit={setEdit} />;
    }
  } else {
    if (role === "admin") {
      return <DisplayAdmin user={user} setEdit={setEdit} />;
    } else if (role === "student") {
      return <DisplayStudent user={user} setEdit={setEdit} />;
    } else if (role === "counsellor") {
      return <DisplayCounsellor user={user} setEdit={setEdit} />;
    }
  }
};

export default DisplayProfile;
