import { useEffect, useState, useContext } from "react";
import CounContext from "../../context/counsellor/counContext";
import AuthContext from "../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";

const CounMess = ({ messages, setAlert, active }) => {
  const [messToShow, setMessToShow] = useState([]);
  const counContext = useContext(CounContext);
  const authContext = useContext(AuthContext);

  const { sendMessage, loadMessages } = counContext;
  const { user } = authContext;
  const [currMess, setCurrMess] = useState("");

  const scrollToBottom = () => {
    const elem = document.getElementById("messagesEndCoun");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messToShow]);

  const onChange = (e) => {
    M.updateTextFields();
    setCurrMess(e.target.value);
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

    let temp = messToShow;
    temp.push(messToSend);
    if (temp.length === 1) {
      temp[temp.length - 1].mess_id = 1;
    } else {
      temp[temp.length - 1].mess_id = temp[temp.length - 2].mess_id + 1;
    }
    setMessToShow(temp);

    sendMessage(messToSend);
  };

  const sendOnEnter = (event) => {
    if (event.key === "Enter") {
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

      let temp = messToShow;
      temp.push(messToSend);
      if (temp.length === 1) {
        temp[temp.length - 1].mess_id = 1;
      } else {
        temp[temp.length - 1].mess_id = temp[temp.length - 2].mess_id + 1;
      }
      setMessToShow(temp);

      sendMessage(messToSend);
    }
  };

  if (active === 0) {
    return "";
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflowY: "hidden",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          height: "500px",
          overflowX: "hidden",
          padding: "1.5rem",
        }}
      >
        {messToShow.map((mess) => {
          return (
            <div
              key={mess.mess_id}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              className={
                mess.from_role === "counsellor" ? "text-right" : "text-left"
              }
            >
              <div>
                <span style={{ maxWidth: "200px" }}>{mess.mess_desc}</span>
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
        }}
      >
        <input
          type='text'
          value={currMess}
          id='currMess'
          name='currMess'
          className='validate'
          onChange={onChange}
          onKeyPress={sendOnEnter}
        />
        <button
          onClick={send}
          style={{
            height: "30px",
            padding: "5px",
            marginTop: "15px",
            marginLeft: "10px",
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default CounMess;
