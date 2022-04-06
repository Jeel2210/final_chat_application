import Chat from "./pages/chat/chat";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React, { useState } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";
import "antd/dist/antd.css";
import Sidebar from "./pages/sidebar/Sidebar";
import RegisterPage from "./pages/register";
// import PageRouter from "./pages";

const socket = io.connect("/");

console.log(socket, "dsds");
const App = () => {
  const [rederpage, setrenderpage] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const Authorize = JSON.parse(localStorage.getItem("status"));

  function Appmain(props) {
    return (
      <>
        <div className="app_window">
          <Sidebar setSelectedUser={setSelectedUser} />
          <Chat
            username={props.match.params.username}
            roomname={props.match.params.roomname}
            socket={socket}
            selectedUser={selectedUser}
            rederpage={rederpage}
          />
        </div>
      </>
    );
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
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
