import React from "react";
import onlineIcon from "../icons/onlineIcon.png";
import "./OnlineUsers.css";

const OnlineUsers = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>People currently chatting in this room:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default OnlineUsers;
