import { useEffect, useState, useContext } from "react";
import CounContext from "../../../../context/counsellor/counContext";
import AuthContext from "../../../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";

const CounMess = ({ messages, active }) => {
  const [messToShow, setMessToShow] = useState([]);
  const counContext = useContext(CounContext);
  const authContext = useContext(AuthContext);

  const { sendMessage, loadMessages } = counContext;
  const { user } = authContext;
  const [currMess, setCurrMess] = useState("");

  let temp = [];
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].stud_id === active) {
          temp.push(messages[i]);
        }
      }
    }
    setMessToShow(temp);
    //eslint-disable-next-line
  }, [active, messages]);

  useEffect(() => {
    const interval = setInterval(loadMessages, 3000);
    M.AutoInit();
    M.updateTextFields();
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    M.updateTextFields();
    setCurrMess(e.target.value);
  };

  const scrollToBottom = () => {
    const elem = document.getElementById("messagesEndCoun");
    if (elem) {
      elem.scrollIntoView({ behavior: "auto" });
    }
  };

  const send = () => {
    let date;
    date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2);

    if (currMess === "") {
      return;
    }
    let messToSend = {
      stud_id: active,
      coun_id: user.user_id,
      from_role: "counsellor",
      mess_desc: currMess,
      mess_date: date,
    };

    setCurrMess("");
    M.updateTextFields();

    let temp = messToShow;
    temp.push(messToSend);
    if (temp.length === 1) {
      temp[temp.length - 1].mess_id = 1;
    } else {
      temp[temp.length - 1].mess_id = temp[temp.length - 2].mess_id + 1;
    }
    setMessToShow(temp);

    sendMessage(messToSend);
    setTimeout(scrollToBottom, 10);
  };

  if (active === 0) {
    return "";
  }

  return (
    <div
      style={{
        height: "100%",
        width: "75%",
        paddingTop: "0.15rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "auto",
      }}
    >
      <div
        style={{
          overflowX: "hidden",
          padding: "1.5rem",
          zIndex: "100",
        }}
      >
        {messToShow.length === 0
          ? "Be the first to start the conversation!!!"
          : ""}
        {messToShow.map((mess) => {
          return (
            <div
              key={mess.mess_id}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                whiteSpace: "initial",
              }}
            >
              <div
                className={
                  mess.from_role === "counsellor"
                    ? "text-right message-container"
                    : "text-left message-container"
                }
              >
                <pre
                  style={{
                    display: "block",
                    maxWidth: "250px",
                    whiteSpace: "pre-line",
                    fontFamily: "Lucida Sans, sans-serif",
                  }}
                  className='message'
                >
                  {mess.mess_desc}
                </pre>
              </div>
            </div>
          );
        })}
        <div
          style={{ float: "left", clear: "both" }}
          id='messagesEndCoun'
        ></div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-end",
          zIndex: "100",
          borderBottomRightRadius: "0.25rem",
          padding: "0.5rem",
          backgroundColor: "rgba(255,255,255,0.75)",
        }}
      >
        <textarea
          value={currMess}
          id='currMess'
          name='currMess'
          className='validate materialize-textarea'
          onChange={onChange}
          placeholder='Type something'
          style={{ width: "80%", marginRight: "2rem", maxHeight: "75px" }}
        />
        <a
          onClick={send}
          className='waves-effect waves-light btn z-depth-0'
          style={{
            borderRadius: "10px",
            backgroundColor: "#255F85",
            margin: "0",
            width: "10%",
            marginTop: "8px",
            marginRight: "1.5em",
            fontSize: "1rem",
          }}
          href='#!'
        >
          send
        </a>
      </div>
    </div>
  );
};

// Set proptypes
CounMess.propTypes = {
  messages: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
};

export default CounMess;
