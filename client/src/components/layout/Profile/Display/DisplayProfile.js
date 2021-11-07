import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../../context/auth/authContext";
import DisplayAdmin from "./DisplayAdmin";
import DisplayStudent from "./DisplayStudent";
import DisplayCounsellor from "./DisplayCounsellor";
import EditAdmin from "../Edit/EditAdmin";
import EditStudent from "../Edit/EditStudent";
import EditCounsellor from "../Edit/EditCounsellor";
import Preloader from "../../Preloader/Preloader";

const DisplayProfile = ({ tabKey }) => {
  const authContext = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  const { user, loadUser } = authContext;

  useEffect(() => {
    if (tabKey === "profile") {
      loadUser();
    }
    // eslint-disable-next-line
  }, [tabKey]);

  useEffect(() => {
    // eslint-disable-next-line
  }, [user]);

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
