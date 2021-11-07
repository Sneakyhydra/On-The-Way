// Imports
import { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";

// Auth routes
import RegisterStudent from "./components/auth/RegisterStudent";
import RegisterCounsellor from "./components/auth/RegisterCounsellor";
import RegisterAdmin from "./components/auth/RegisterAdmin";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Layout components
import HomeNavbar from "./components/layout/Navbar/HomeNavbar";
import Alerts from "./components/layout/Alert/Alerts";

// States
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import AdminState from "./context/admin/AdminState";
import CounState from "./context/counsellor/CounState";
import StudState from "./context/student/StudState";

// CSS
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

// Images
import background from "./images/HomePage/Background1.jpeg";

const App = () => {
  // Set scroll state
  const [scrollState, setScrollState] = useState("top");

  // Init Materialize JS
  useEffect(() => {
    M.AutoInit();
  }, []);

  // Check the amount of pixels scrolled
  useEffect(() => {
    let listener = null;

    // Set the value of scroll
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 45) {
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
        <AdminState>
          <CounState>
            <StudState>
              <Router>
                <Alerts />
                <Switch>
                  {/* Home page */}
                  <Route exact path='/'>
                    <Fragment>
                      <div
                        style={{
                          backgroundImage: `url(${background})`,
                          maxHeight: "720px",
                          fontFamily: "Lucida Sans, sans-serif",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                          backgroundSize: "100% 100%",
                          backgroundColor: "white",
                        }}
                      >
                        <HomeNavbar scrollState={scrollState} />
                        <Home />
                      </div>
                    </Fragment>
                  </Route>

                  {/* Register student page */}
                  <Route exact path='/regstudent'>
                    <div
                      style={{
                        fontFamily: "Lucida Sans, sans-serif",
                      }}
                    >
                      <RegisterStudent />
                    </div>
                  </Route>

                  {/* Register counsellor page */}
                  <Route exact path='/regcounsellor'>
                    <div
                      style={{
                        fontFamily: "Lucida Sans, sans-serif",
                      }}
                    >
                      <RegisterCounsellor />
                    </div>
                  </Route>

                  {/* Dashboard */}
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />

                  {/* Register admin page */}
                  <Route exact path='/ad123'>
                    <div
                      style={{
                        fontFamily: "Lucida Sans, sans-serif",
                      }}
                    >
                      <RegisterAdmin />
                    </div>
                  </Route>

                  {/* Not found */}
                  <Route path='*'>
                    <NotFound />
                  </Route>
                </Switch>
              </Router>
            </StudState>
          </CounState>
        </AdminState>
      </AlertState>
    </AuthState>
  );
};

export default App;
