import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from "../core/chatRedux/axios";
import { getData, setData } from "../core/locaStorage/Local";
import Chat from "./chat/chat";
import GroupChat from "./GroupChat/GroupChat";
import Sidebar from "./sidebar/Sidebar";
import { PageStyle } from "./style";
import { Row, Col, Divider } from "antd";

const PageRoute = (props) => {
  const { rederpage, socket } = props;
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    axios
      .getAllUsers({
        Authorization: `Bearer ${getData("user").token}`,
      })
      .then((res) => {
        if (res.data.status === true) {
          const userData = getData("user");
          const list = [...res.data.data];
          const index = list.findIndex((e) => e.id === userData.id);
          if (index !== -1) {
            list.splice(index, 1);
          }
          setData("localUserList", list);
        } else {
          setData("localUserList", []);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    socket.on("groupListResponse", (list) => {
      if (list && list.length !== 0) {
        setUserExist(false);
      } else {
        setUserExist(false);
      }
    });
  }, [socket]);

  const ActiveGroup = getData("groupActive");

  return (
    <PageStyle>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ margin: "0px", padding: "0px" }}
        className="app_window"
      >
        <Col
          className="gutter-row"
          span={4}
          style={{ margin: "0px", padding: "0px" }}
        >
          <Sidebar
            setSelectedUser={setSelectedUser}
            socket={socket}
            setSelectedGroup={setSelectedGroup}
            setUserExist={setUserExist}
          />
        </Col>
        <Col
          className="gutter-row"
          span={20}
          style={{ margin: "0px", padding: "0px" }}
        >
          <Route
            render={() =>
              ActiveGroup ? (
                <Redirect to="/chat/group" exact />
              ) : (
                <Redirect to="/chat" />
              )
            }
          ></Route>
          <Switch>
            {ActiveGroup === true ? (
              <Route path="/chat/group">
                <GroupChat
                  socket={socket}
                  userExist={userExist}
                  selectedGroup={selectedGroup}
                />
              </Route>
            ) : (
              <Route path="/chat">
                <Chat
                  username={props.match.params.username}
                  socket={socket}
                  selectedUser={selectedUser}
                  rederpage={rederpage}
                  userExist={userExist}
                />
              </Route>
            )}
          </Switch>
        </Col>
      </Row>
    </PageStyle>
  );
};

export default PageRoute;
