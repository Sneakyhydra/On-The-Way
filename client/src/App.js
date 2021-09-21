import { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";

// Auth routes
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Layout components
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";

// States
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

// Global variable for axios
import setAuthToken from "./utils/setAuthToken";

// CSS
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

// Images
import background from "./images/Background1.jpeg";

// Initialize token everytime the app is rendered
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Set scroll state
  const [scrollState, setScrollState] = useState("top");

  // Check the amount of pixels scrolled
  useEffect(() => {
    let listener = null;

    // Set the value of scroll
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 40) {
        if (scrollState !== "amir") {
          setScrollState("amir");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      // Remove Listener after getting the value
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  return (
    <AuthState>
      <AlertState>
        <Router>
          <Alerts />
          <Switch>
            <Route exact path='/'>
              <Fragment>
                <div
                  style={{
                    backgroundImage: `url(${background})`,
                    height: "720px",
                    backgroundSize: "cover",
                    fontFamily: "Lucida Sans, sans-serif",
                  }}
                >
                  <Navbar scrollState={scrollState} />
                  <Home />
                </div>
              </Fragment>
            </Route>

            <Route exact path='/login'>
              <div
                style={{
                  fontFamily: "Lucida Sans, sans-serif",
                }}
              >
                <Login />
              </div>
            </Route>

            <Route exact path='/register'>
              <div
                style={{
                  fontFamily: "Lucida Sans, sans-serif",
                }}
              >
                <Register />
              </div>
            </Route>

            <Route exact path='/dashboard'>
              <div
                style={{
                  fontFamily: "Lucida Sans, sans-serif",
                }}
              >
                <Dashboard />
              </div>
            </Route>

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
