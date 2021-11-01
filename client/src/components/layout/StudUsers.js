import { useState, useEffect } from "react";

const StudUsers = ({ users, setAlert, setActive, active }) => {
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
      {users.map((coun) => {
        return (
          <button
            key={coun.coun_id}
            onClick={() => onClick(coun.coun_id)}
            className={
              clickedOn === coun.coun_id ? "chatUsers chatActive" : "chatUsers"
            }
          >
            {coun.coun_name}
          </button>
        );
      })}
    </div>
  );
};

export default StudUsers;
