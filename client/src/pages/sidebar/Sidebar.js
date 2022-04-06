import { Avatar, Button, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Icons from "../../component/Icons/Icons";
import ModalField from "../../component/Modal/ModalDemo";
import axios from "../../core/chatRedux/axios";
import GroupSidebar from "../sidebarGroup/GroupSidebar";
import { SideBarStyle } from "./SidebarStyle";
import ScrollToBottom from "react-scroll-to-bottom";
import { getData, setData } from "../../core/locaStorage/Local";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
const Sidebar = ({
  setSelectedUser,
  socket,
  setSelectedGroup,
  setUserExist,
}) => {
  const history = useHistory();
  const [userListData, setuserListData] = useState([]);
  const [newUserListData, setNewUserListData] = useState([]);
  const [dVisible, setDVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [getUser, setgetUser] = useState([]);
  const [searchName, setsearchName] = useState("");
  const [groupExist, setGroupExist] = useState(false);
  const [deleteModel, setdeleteModel] = useState(false);
  const [deleteUser, setdeleteUser] = useState({});
  const [onlineUserList, setonlineUserList] = useState([]);

  let final = [];

  useEffect(() => {
    let sender = getData("user");
    socket.emit("chatUserHistory", {
      sender: sender.id,
      header: { auth_token: getData("user").token },
    });
  }, [socket]);

  useEffect(() => {
    socket.on("resList", (message) => {
      const userData = getData("user");
      const list = [...message.users];
      const index = list.findIndex((e) => e.id === userData.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
      const ids = list.map((o) => o.id);
      const filtered = list.filter(
        ({ id }, index) => !ids.includes(id, index + 1)
      );
      setuserListData(filtered);
      setUserExist(true);
      setData("receiver", list);
    });
  }, [socket]);

  useEffect(() => {
    if (groupExist) {
      setUserExist(true);
    } else {
      setUserExist(false);
    }
  }, [groupExist]);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      setuserListData((prev) => {
        console.log(data, "data////////////");
        const list = [...prev];
        const index = list.findIndex((e) => e.id === data.sender.id);
        console.log("list", list);
        console.log("index", index);
        console.log("selectedUser", getData("selectedUser"));

        if (index !== -1) {
          if (getData("selectedUser")) {
            if (list[index].id !== getData("selectedUser").id) {
              list[index].newM = true;
              return list;
            }
          } else {
            list[index].newM = true;
            return list;
          }
        } else {
          const localUserList = getData("localUserList");
          const l2 = [...localUserList];
          const i2 = l2.findIndex((e) => e.id === data.sender.id);
          if (i2 !== -1) {
            console.log("gyu");
            l2[i2].newM = true;
            list.unshift(l2[i2]);
            return list;
          } else {
            console.log("na gyu", data.sender, list);
            data.sender.newM = true;
            list.push(data.sender);
            return list;
          }
        }
        return list;
      });
    });
  }, [socket]);

  useEffect(() => {
    window.addEventListener("mousedown", (e) => {
      if (dVisible) {
        if (document.getElementById("open")) {
          if (!document.getElementById("open").contains(e.target)) {
            setDVisible(false);
          }
        }
      }
    });
  }, [dVisible]);

  useEffect(() => {
    socket.on("onlineUserList", (mess) => {
      console.log("onlineUserList", mess.users);
      setonlineUserList(mess.users);
    });
  }, [socket]);

  const handleNewChat = (data) => {
    setData("selectedUser", data);
    setSelectedUser(data);
    const getalluser = getData("receiver");
    if (!getalluser) {
      final.push(data);
      setData("receiver", final);
      setuserListData(final);
    } else {
      if (getalluser.findIndex((ee) => ee.id === data.id) === -1) {
        getalluser.push(data);
        setData("receiver", final);
        setuserListData(getalluser);
      }
    }
  };

  const oncancelmodel = () => {
    setOpenModal(false);
    setsearchName("");
  };

  const setActiveTab = (d) => {
    setUserExist(true);
    history.push("/chat");
    localStorage.removeItem("groupActive");
    localStorage.removeItem("selectedGroup");
    setuserListData((prev) => {
      const list = [...prev];
      const index = list.findIndex((e) => e.id === d.id);
      if (index !== -1) {
        delete list[index].newM;
        console.log(list);
        return list;
      }
      return list;
    });
    setData("selectedUser", d);
    setSelectedUser(d);
  };

  const handleOpenModel = () => {
    setOpenModal(true);
    axios
      .getAllUsers({
        Authorization: `Bearer ${getData("token")}`,
      })
      .then((res) => {
        if (res.data.status === true) {
          const userData = getData("user");
          const list = [...res.data.data];
          const index = list.findIndex((e) => e.id === userData.id);
          if (index !== -1) {
            list.splice(index, 1);
          }
          setgetUser(list);
        } else {
          setgetUser([]);
        }
      })
      .catch(() => {
        setgetUser([]);
      });
  };

  const onChange = (e) => {
    let value = e.target.value;
    setsearchName(value);
    axios
      .getAllUsers({
        Authorization: `Bearer ${getData("token")}`,
      })
      .then((res) => {
        if (res.data.status === true) {
          const userData = getData("user");
          const list = [...res.data.data];
          const index = list.findIndex((e) => e.id === userData.id);
          if (index !== -1) {
            list.splice(index, 1);
          }
          let regString = new RegExp(value, "gi");
          let filterdata = list.filter((item) => {
            if (item.name.match(regString)) {
              return item;
            }
          });
          // setuserListData(filterdata);
          setgetUser(filterdata);
        } else {
          setgetUser([]);
        }
      })
      .catch(() => {
        setgetUser([]);
      });
  };

  const addToMyChat = (user) => {
    localStorage.removeItem("groupActive");
    setData("selectedUser", user);
    setSelectedUser(user);
    const getalluser = getData("receiver");
    if (!getalluser) {
      final.unshift(user);
      setData("receiver", final);
      setuserListData(final);
    } else {
      if (getalluser.findIndex((ee) => ee.id === user.id) === -1) {
        getalluser.unshift(user);
        setData("receiver", getalluser);
        setuserListData(getalluser);
      }
    }
    setOpenModal(false);
  };

  const onDelete = (item) => {
    console.log("item", item);
    setdeleteModel(true);
    setdeleteUser(item);
  };

  const deleteUserData = () => {
    console.log("deleteUser", deleteUser);
    let deleteUserdata = userListData.filter(
      (user) => user.id !== deleteUser.id
    );
    setuserListData(deleteUserdata);
    // socket called
    // socket.emit("deleteUser", deleteUser);
    setdeleteModel(false);
  };
  let currentUser = getData("user");
  return (
    <SideBarStyle className="sidebar">
      <header>
        <div style={{ marginTop: "10px" }}>
          <Avatar
            size={{
              xs: 30,
              sm: 30,
              md: 30,
              lg: 30,
              xl: 30,
            }}
          >
            {!currentUser.name ? null : `${currentUser.name.charAt(0)}`}
          </Avatar>
          <p
            style={{ height: "25px" }}
            className="header--btn"
            onClick={() => {
              setModal(true);
            }}
          >
            <IoLogOutOutline style={{ height: "20px" }} />
          </p>
        </div>
      </header>
      <div
        className="search"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>Chat's</span>
        <GoPlus
          onClick={handleOpenModel}
          id="open"
          className={dVisible ? "open" : "close"}
          style={{
            cursor: "pointer",
            verticalAlign: "text-top",
            height: "25px",
          }}
        />
      </div>
      <div className="chatList">
        {userListData.length === 0 ? (
          <div className="nodata">NO USER FOUND</div>
        ) : (
          userListData.map((item, key) => (
            <div
              className="chatListItem"
              key={key}
              onClick={() => setActiveTab(item, key)}
            >
              <div
                className="chat-main-status"
                style={{
                  background:
                    onlineUserList &&
                    onlineUserList.length !== 0 &&
                    onlineUserList.findIndex((ee) => ee.id === item.id) === -1
                      ? "#707C97"
                      : "#00c305",
                }}
              />
              <Avatar
                style={{ cursor: "pointer", marginLeft: "5px" }}
                size={{
                  xs: 30,
                  sm: 30,
                  md: 30,
                  lg: 30,
                  xl: 30,
                }}
              >
                {!item.name ? null : `${item.name.charAt(0)}`}
              </Avatar>

              <div className="chatListItem--lines">
                <div className="chatListItem--line">
                  <div className="chatListItem--name">{item.name}</div>
                  {item.newM ? (
                    <div className="chatlistItem--date">
                      <Icons type="newMessage" />
                    </div>
                  ) : null}
                </div>
                <div className="chatListItem--line">
                  <div className="chatListItem--LastMsg">
                    <p>{item.email}</p>
                  </div>
                  <Popover
                    placement="rightTop"
                    title="Title"
                    content={
                      <div
                        onClick={() => onDelete(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <CgTrash />
                        Delete
                      </div>
                    }
                    trigger="click"
                  >
                    <BsThreeDotsVertical />
                  </Popover>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <GroupSidebar
        setSelectedGroup={setSelectedGroup}
        socket={socket}
        setGroupExist={setGroupExist}
      />
      <ModalField
        visible={modal}
        title="Logout User"
        className="uploadmodal"
        onCancel={() => {
          setModal(false);
        }}
        footer={[
          <Button
            key="submitPost"
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
          >
            Logout
          </Button>,
          <Button
            key="cancelpost"
            type="primary"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>,
        ]}
      >
        <span className="permission">Are you sure want to logout ?</span>
      </ModalField>

      <ModalField
        visible={openModal}
        className="uploadmodal"
        onCancel={oncancelmodel}
        footer={false}
        title="Find A Person"
      >
        <div className="overflowDiv">
          <input
            value={searchName}
            placeholder="Search Person To Chat"
            onChange={(e) => onChange(e)}
            style={{
              width: "100%",
              height: "45px",
              borderRadius: "20px",
              borderColor: "#707070",
              fontSize: "15px",
              paddingLeft: "10px",
            }}
          />
          <div
            className="userList"
            style={{ marginTop: "15px", overflow: "auto", height: "300px" }}
          >
            <ScrollToBottom>
              {getUser.length === 0 && (
                <div
                  className="controlLabel"
                  style={{
                    marginTop: "15px",
                    fontSize: "17px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  NO DATA FOUND
                </div>
              )}
              {getUser.length !== 0 &&
                getUser.map((user, index) => (
                  <div
                    className="controlLabel"
                    key={index}
                    style={{
                      marginTop: "15px",
                      fontSize: "17px",
                      cursor: "pointer",
                    }}
                    onClick={() => addToMyChat(user)}
                  >
                    {user.name}
                  </div>
                ))}
            </ScrollToBottom>
          </div>
        </div>
      </ModalField>

      <ModalField
        visible={deleteModel}
        title="Delete this conversation?"
        className="uploadmodal"
        onCancel={() => {
          setdeleteModel(false);
        }}
        footer={[
          <Button
            key="cancelpost"
            type="primary"
            onClick={() => setdeleteModel(false)}
          >
            Cancel
          </Button>,
          <Button danger onClick={deleteUserData}>
            Delete
          </Button>,
        ]}
      >
        <span className="permission">
          Deleting a conversation from your history is permanent. Other
          participants can still view this conversation.
        </span>
      </ModalField>
    </SideBarStyle>
  );
};

export default Sidebar;
