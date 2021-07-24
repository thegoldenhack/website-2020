import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-reboot.css";

import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import ApplicationPage from "./views/ApplicationPage";
import NotFound from "./views/NotFound";
import ForgotPasswordPageSend from "./views/ForgotPasswordPageSend";
import ForgotPasswordPageInput from "./views/ForgotPasswordPageInput";
import ForgotPasswordPageChange from "./views/ForgotPasswordPageChange";
import WebsitePage2020 from "./views/WebsitePage2020";
import WebsitePage2021 from "./views/WebsitePage2021";
import DashboardPage from "./views/DashboardPage";
import ConfirmAccountPage from "./views/ConfirmAccountPage";
import MyEventsPage from "./views/MyEventsPage";
import ExecPage from "./views/ExecPage";
import AllEventsPage from "./views/AllEventsPage";
import ModalDisplay from "./components/ApplicationModal/ModalDisplay";

import "./index.css";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={WebsitePage2021} />
      <Route path="/exec" component={ExecPage} />
      <Route path="/events" component={AllEventsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/confirmaccount" component={ConfirmAccountPage} />
      <Route path="/forgotpassword" component={ForgotPasswordPageSend} />
      <Route
        path="/forgotpasswordpageinput"
        component={ForgotPasswordPageInput}
      />
      <Route
        path="/forgotpasswordpagechange"
        component={ForgotPasswordPageChange}
      />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/application" component={ApplicationPage} />
      <Route exact path="/2020" component={WebsitePage2020} />
      <Route path="/myevents" component={MyEventsPage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
