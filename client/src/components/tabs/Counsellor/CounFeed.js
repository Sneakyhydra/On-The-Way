import { useState, useContext } from "react";
import AlertContext from "../../../context/alert/alertContext";
import CounContext from "../../../context/counsellor/counContext";
import AuthContext from "../../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";

const CounFeed = () => {
  const [desc, setDesc] = useState("");

  const alertContext = useContext(AlertContext);
  const counContext = useContext(CounContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { user } = authContext;
  const { submitFeed } = counContext;

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
        coun_id: user.user_id,
        desc: desc,
      });

      setAlert("Submitted Successfully", "success");

      setDesc("");
    }
  };

  return (
    <div className='row'>
      <form
        className='col s12'
        onSubmit={onSubmit}
        style={{ marginTop: "5em" }}
      >
        <div className='row' style={{ width: "400px", margin: "auto" }}>
          <div className='input-field col s12'>
            <textarea
              id='desc'
              name='desc'
              type='text'
              className='validate materialize-textarea'
              value={desc}
              onChange={onChange}
              required
              style={{ minWidth: "400px" }}
            />
            <label htmlFor='desc'>Feedback</label>
          </div>
        </div>

        <div className='row'>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            value='Feedback'
            style={{ borderRadius: "2em", marginTop: "2em", width: "10em" }}
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
