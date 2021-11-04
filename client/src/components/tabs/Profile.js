import DisplayProfile from "../layout/Profile/Display/DisplayProfile";

const Profile = ({ tabKey }) => {
  return (
    <div style={{ marginTop: "5em" }}>
      <DisplayProfile tabKey={tabKey} />
    </div>
  );
};

export default Profile;
