import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const StudUsers = ({ users, setActive, active }) => {
  const [clickedOn, setClickedOn] = useState(active);

  useEffect(() => {
    setActive(clickedOn);
    // eslint-disable-next-line
  }, [clickedOn]);

  useEffect(() => {
    setClickedOn(active);
  }, [active]);

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
        width: "25%",
        minHeight: "100%",
        margin: "0",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        borderRight: "2px solid #2c363f",
        padding: "0",
        justifyContent: "flex-start",
        alignItems: "center",
        flexGrow: "initial",
        backgroundColor: "white",
        borderTopLeftRadius: "0.4rem",
        borderBottomLeftRadius: "0.4rem",
        zIndex: "100",
      }}
      className='userArea'
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
