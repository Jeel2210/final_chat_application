import { Avatar } from "antd";
import React from "react";
import "../nodata/style.scss";
import Api from "../../core/chatRedux/axios";
import { getData } from "../../core/locaStorage/Local";

const NoData = (props) => {
  const handleClick = () => {
    Api.getAllUsers({
      Authorization: `Bearer ${getData("user").token}`,
    }).then((res)=>{
        if(res.data.data.status === true){
            props.setuserList(res.data.data);
        }else{
            props.setuserList([]);
        }
    });
  };
  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          <Avatar
            style={{ cursor: "pointer" }}
            size={{
              xs: 30,
              sm: 30,
              md: 30,
              lg: 30,
              xl: 30,
            }}
          >
            {/* {username && username.split(" ").length > 1
                ? `${username.charAt(0)}${username.split(" ")[1].charAt(0)}`
                : `${username.charAt(0)}`} */}
          </Avatar>
        </h2>
      </div>
      <div className="chat-message"></div>
      <div className="send">
        <div className="btn-box" onClick={handleClick}>
          <span style={{ fontWeight: "bolder", paddingLeft: "5px" }}>+</span>
          {/* <RiSendPlaneLine className="btn-icon" onClick={sendData} /> */}
        </div>
      </div>
    </div>
  );
};

export default NoData;
