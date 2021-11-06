import { useState, useContext } from "react";
import AlertContext from "../../../context/alert/alertContext";
import StudContext from "../../../context/student/studContext";
import AuthContext from "../../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";

const CounFeed = () => {
  const [desc, setDesc] = useState("");

  const alertContext = useContext(AlertContext);
  const studContext = useContext(StudContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { user } = authContext;
  const { submitFeed } = studContext;

  const onChange = (e) => {
    M.updateTextFields();
    setDesc(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (desc === "") {
      setAlert("Please enter feedback", "danger");
    } else {
      submitFeed({
        stud_id: user.user_id,
        desc: desc,
      });

      setAlert("Submitted Successfully", "success");

      setDesc("");
    }
  };

  return (
    <div
      className='row'
      style={{
        backgroundColor: "white",
        width: "40vw",
        height: "40vh",
        borderRadius: "0.75rem",
        marginTop: "1em",
      }}
    >
      <form
        className='col s12'
        onSubmit={onSubmit}
        style={{ marginTop: "5em" }}
      >
        <div className='row' style={{ width: "25vw", margin: "auto" }}>
          <div className='input-field col s12'>
            <textarea
              id='desc'
              name='desc'
              type='text'
              className='validate materialize-textarea'
              value={desc}
              onChange={onChange}
            />
            <label htmlFor='desc'>Feedback</label>
          </div>
        </div>

        <div className='row'>
          <button
            className='btn waves-effect waves-light z-depth-0'
            type='submit'
            value='Feedback'
            style={{
              borderRadius: "1rem",
              marginTop: "2em",
              width: "10em",
              backgroundColor: "#255F85",
            }}
          >
            Send Feedback
            <i className='material-icons right'>send</i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CounFeed;
