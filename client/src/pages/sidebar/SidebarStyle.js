import styled from "styled-components";
export const SideBarStyle = styled.div`
  // width: 20%;
  height: 100vh;
  // max-width: 415px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;

  header {
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .chat-main-status {
    width: 10px;
    height: 10px;
    border: 1.5px solid #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    top: -14px;
    left: 37px;
  }
  .header--avatar {
    width: 40;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
  }
  .header--buttons {
    display: flex;
  }
  .header--btn {
    float: right;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 25px;
  }
  .search {
    background-color: #f6f6f6;
    border-bottom: 1px solid #eee;
    padding: 5px 15px;
    font-weight: bold;
    font-size: large;
  }
  .search--input {
    background-color: #fff;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .search--input input {
    flex: 1;
    border: 0;
    outline: 0;
    background-color: transparent;
    margin-left: 10;
  }
  .chatList {
    // flex: 1;
    height: calc(100vh - 400px);
    background-color: #fff;
    overflow-y: auto;
  }
  .chatList::-webkit-scrollbar-thumb {
    background: #1890ff;
    border-radius: 10px;
  }
  .chatList::-webkit-scrollbar {
    height: 5px;
    width: 3px;
  }

  .chatList::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  .chatListItem {
    display: flex;
    cursor: pointer;
    align-items: center;
    height: 70px;
  }
  .chatListItem--avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 15px;
  }
  .chatListItem--lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #eee;
    padding-right: 15px;
    margin-left: 12px;
    height: 100%;

    flex-wrap: wrap;
    min-width: 0;
  }
  .chatListItem--line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .chatListItem--name {
    font-size: 16px;
    color: #000;
  }
  .chatlistItem--date {
    font-size: 12px;
    color: #999;
  }
  .chatListItem--LastMsg {
    font-size: 14px;
    color: #999;
    display: flex;
    width: 100%;
  }
  .chatListItem--LastMsg p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }
  .nodata {
    text-align: center;
    top: 20px;
    position: relative;
    font-weight: bolder;
  }
  .btn-box {
    width: 35px;
    height: 35px;
    background: linear-gradient(325.78deg, #2a8bf2 14.76%, #7cb8f7 87.3%);
    border-radius: 50px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
    cursor: pointer;
    padding: 8px;
    position: relative;
    top: 8px;
    margin-left: 3px;
    padding-right: 9px;
    .btn-icon {
      width: 18px;
      height: 18px;
      color: white;
    }
  }
  .create-chat-menu {
    border-radius: 15px;
    background: linear-gradient(92.68deg, #7cb8f7 0%, #2a8bf2 100%);
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 9;
    // height: 300px;
  }
  .create-chat-input {
    border-radius: 10px 10px 0px 0px;
  }
  .create-chat-li {
    list-style-type: none;
    margin: 5px 0px;
  }
  .create-chat-outer-div {
    color: #ffffff;
    cursor: pointer;
  }
  .create-chat-title {
    padding: 0px;
    margin: 0px;
    font-weight: 500px;
  }
  .create-chat-email {
    padding: 0px;
    margin: 0px;
    font-size: 13px;
  }
  .createButton {
    border-radius: 50%;
    border: none;
    // background-color: blue;
    // color: white;
    // width:50%;
    height: 50%;
    margin-top: 5px;
  }
`;
