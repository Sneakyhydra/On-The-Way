import { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import Navbar from "./components/layout/Navbar";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

import background from "./images/Background1.jpeg";

const App = () => {
  const [scrollState, setScrollState] = useState("top");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let listener = null;
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
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  return (
    <Router>
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
              <Navbar scrollState={scrollState} isAuth={isAuth} />
              <Home />
            </div>
          </Fragment>
        </Route>

        <Route path='/login'>
          <div
            style={{
              fontFamily: "Lucida Sans, sans-serif",
            }}
          >
            <Login />
          </div>
        </Route>

        <Route path='/register'>
          <div
            style={{
              fontFamily: "Lucida Sans, sans-serif",
            }}
          >
            <Register />
          </div>
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
