/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Select, Avatar, Input, Popover } from "antd";
import Icons from "../../component/Icons/Icons";

import ModalField from "../../component/Modal/ModalDemo";
import { GroupStyle } from "./GroupStyle";
import InputDemo from "../../component/Input/InputDemo";
import axios from "../../core/chatRedux/axios";
import { useHistory } from "react-router";
import moment from "moment";
import { getData, setData } from "../../core/locaStorage/Local";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { GoPlus } from "react-icons/go";

const { Option } = Select;

const GroupSidebar = ({ setSelectedGroup, socket, setGroupExist }) => {
  const [openGroupModal, setopenGroupModal] = useState(false);
  const [userListData, setuserListData] = useState([]);
  const [groupList, setgroupList] = useState([]);
  const [deleteModel, setdeleteModel] = useState(false);
  const [deleteGroup, setdeleteGroup] = useState({});

  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    //create group
    socket.on("createGroupResponse", (responce) => {
      console.log("responce", responce);
      setopenGroupModal(false);
      form.resetFields();
      setgroupList((prev) => {
        const list = [...prev];
        list.unshift(responce);
        setData("GroupList", list);
        return list;
      });
    });
    //group list responce
    socket.on("groupListResponse", (list) => {
      if (list) {
        setgroupList((prev) => {
          prev = [...list];
          return prev;
        });
        // if (list.length === 0) {
        //   localStorage.removeItem("selectedGroup");
        // }
        setGroupExist(true);
      }
    });
    socket.on("newGroup", (list) => {
      if (list) {
        console.log("........vvvv..........");
        setgroupList((prev) => {
          const dd = [...prev];
          const s = dd.findIndex((e) => e.groupId === list.groupId);
          if (s === -1) {
            dd.unshift({ groupId: list.groupId, groupName: list.groupName });
            return dd;
          }
          return dd;
        });
        // setUserExist(true);
      }
      console.log(list, "...newGroup...");
    });
    socket.on("newGroupMessage", (data) => {
      setgroupList((prev) => {
        console.log(data, "gyu");

        const list = [...prev];
        const index = list.findIndex((e) => e.groupId === data.group_id);

        if (index !== -1) {
          if (getData("selectedGroup")) {
            if (list[index].groupId !== getData("selectedGroup").groupId) {
              list[index].newM = true;
              return list;
            }
          } else {
            list[index].newM = true;
            return list;
          }
        } else {
          console.log(list, "gyu");
          const newMess = {
            groupId: data.group_id,
            groupName: data.group_name,
            newM: true,
          };
          // l2[i2].newM = true;
          list.unshift(newMess);
          return list;
        }
        return list;
      });
      console.log(data, "....data...");
    });
  }, [socket]);

  //group list call
  useEffect(() => {
    socket.emit("groupList", {
      userId: getData("user").id,
      header: { auth_token: getData("user").token },
    });
  }, []);

  //create group
  const createGroup = () => {
    setopenGroupModal(true);
    axios
      .getAllUsers({
        Authorization: `Bearer ${getData("user").token}`,
      })
      .then((res) => {
        if (res.data.status === true) {
          const data = [...res.data.data];
          data.forEach((e) => {
            e.value = e.id;
            return e;
          });
          setuserListData(data);
        } else {
          setuserListData([]);
        }
      })
      .catch(() => {
        setuserListData([]);
      });
  };

  //active current chat
  const setActiveGroup = (item, key) => {
    console.log(item, key);
    setGroupExist(true);
    setData("groupActive", true);
    setData("selectedGroup", item);
    history.push("/chat/group");
    setgroupList((prev) => {
      const list = [...prev];
      const index = list.findIndex((e) => e.groupId === item.groupId);
      if (index !== -1) {
        delete list[index].newM;
        return list;
      }
      return list;
    });
    setSelectedGroup(item);
  };

  //create new group
  const onFinish = (values) => {
    let data = {
      groupName: values.groupName,
      adminId: getData("user").id,
      joinedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      users: values.groupUsers,
    };
    socket.emit("createGroup", data);
  };

  const onDelete = (item) => {
    console.log("item", item);
    setdeleteModel(true);
    setdeleteGroup(item);
  };

  const deleteGroupData = () => {
    console.log("delete group", deleteGroup);
    console.log("groupList", groupList);
    let deletedgroup = groupList.filter(
      (item) => item.groupId !== deleteGroup.groupId
    );
    setgroupList(deletedgroup);
    setdeleteModel(false);
  };
  return (
    <GroupStyle>
      <div className="search">
        <span>Group's</span>
        <div className="header--buttons">
          <GoPlus
            onClick={createGroup}
            style={{ height: "25px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="chatList">
        {!groupList || groupList.length === 0 ? (
          <div className="nodata">NO GROUP FOUND</div>
        ) : (
          groupList.map((item, key) => (
            <div
              className="chatListItem"
              key={key}
              onClick={() => setActiveGroup(item, key)}
            >
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
                {!item.groupName ? null : `${item.groupName.charAt(0)}`}
              </Avatar>
              <div className="chatListItem--lines">
                <div
                  className="chatListItem--line"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="chatListItem--name"> {item.groupName} </div>
                  {item.newM ? (
                    <div className="chatlistItem--date">
                      <Icons type="newMessage" />
                    </div>
                  ) : null}
                  <Popover
                    placement="rightTop"
                    title="Title"
                    content={
                      <div
                        key={item.id}
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
      {/* create group modal  */}
      <ModalField
        visible={openGroupModal}
        title="Create Group"
        className="uploadmodal"
        onCancel={() => {
          setopenGroupModal(false);
          form.resetFields();
        }}
        footer={
          <Button form="GroupForm" key="submit" htmlType="submit">
            Create
          </Button>
        }
      >
        <div className="CreateGroupForm">
          <Form
            form={form}
            onFinish={onFinish}
            id="GroupForm"
            className=" ant-form-vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <InputDemo
              name="groupName"
              label="Group Name"
              hasFeedback={false}
              rules={[
                {
                  required: true,
                  message: "GroupName is required",
                },
              ]}
              Input={
                <Input autoComplete="off" placeholder="Input Group Name" />
              }
            />
            <Form.Item
              label="Group Users"
              name="groupUsers"
              rules={[
                {
                  required: true,
                  message: "Select Users",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please Select">
                {userListData &&
                  userListData.map((e) => (
                    <Option key={e.id} value={e.id}>
                      {e.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </ModalField>

      {/* delet group modal  */}
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
          <Button danger onClick={deleteGroupData}>
            Delete
          </Button>,
        ]}
      >
        <span className="permission">
          Deleting a conversation from your history is permanent. Other
          participants can still view this conversation.
        </span>
      </ModalField>
    </GroupStyle>
  );
};

export default GroupSidebar;
