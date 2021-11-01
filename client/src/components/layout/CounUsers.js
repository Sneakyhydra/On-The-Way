import { useState, useEffect } from "react";

const CounUsers = ({ users, setAlert, setActive, active }) => {
  const [clickedOn, setClickedOn] = useState(0);

  useEffect(() => {
    setActive(clickedOn);
    // eslint-disable-next-line
  }, [clickedOn]);

  const onClick = (id) => {
    setClickedOn(id);
  };

  return (
    <div
      style={{
        width: "200px",
        height: "auto",
        margin: "0",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        border: "2px solid",
        padding: "0",
        justifyContent: "flex-start",
        alignItems: "center",
        flexGrow: "initial",
      }}
    >
      {users.map((stud) => {
        return (
          <button
            key={stud.stud_id}
            onClick={() => onClick(stud.stud_id)}
            className={
              clickedOn === stud.stud_id ? "chatUsers chatActive" : "chatUsers"
            }
          >
            {stud.stud_name}
          </button>
        );
      })}
    </div>
  );
};

export default CounUsers;
