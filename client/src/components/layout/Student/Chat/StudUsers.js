import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const StudUsers = ({ users, setActive }) => {
  const [clickedOn, setClickedOn] = useState(0);

  useEffect(() => {
    setActive(clickedOn);
    // eslint-disable-next-line
  }, [clickedOn]);

  const scrollToBottom = () => {
    const elem = document.getElementById("messagesEndStud");
    if (elem) {
      elem.scrollIntoView({ behavior: "auto" });
    }
  };

  const onClick = (id) => {
    setClickedOn(id);
    setTimeout(scrollToBottom, 10);
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

// Set proptypes
StudUsers.propTypes = {
  users: PropTypes.array.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default StudUsers;
