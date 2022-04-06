import Home from "./pages/home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React, { useState } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";
import "antd/dist/antd.css";
import RegisterPage from "./pages/register";
import PageRoute from "./pages";
import {getData} from "./core/locaStorage/Local";
const socket = io.connect("/");

const App = () => {
  const [rederpage, setrenderpage] = useState(false);

  const Authorize = getData("status");

  function Appmain(props) {
    return <PageRoute rederpage={rederpage} socket={socket} {...props} />;
  }

  return (
    <Router>
      <div className="App">
        <Route
          render={() =>
            Authorize ? <Redirect to="/chat" /> : <Redirect to="/" />
          }
        ></Route>
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} setrenderpage={setrenderpage} />
          </Route>
          <Route path="/chat" component={Appmain} />
          <Route path="/register" exact>
            <RegisterPage socket={socket} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
