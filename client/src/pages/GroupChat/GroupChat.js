/* eslint-disable no-unused-vars */
import { Avatar, Button, message, Upload } from "antd";
import axios from "axios";
import Avatars from "react-avatar";
import ImageViewer from "react-simple-image-viewer";
import moment from "moment";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import Icons from "../../component/Icons/Icons";
import ModalField from "../../component/Modal/ModalDemo";
import APi from "../../core/chatRedux/axios";
import { getData } from "../../core/locaStorage/Local";
import ScrollToBottom from "react-scroll-to-bottom";
import { GroupStyle } from "./GroupStyle";
import "./GroupChatStyle.scss";

const GroupChat = ({ socket, selectedGroup, userExist }) => {
  // const {} = props;
  const [text, setText] = useState("");
  const [recieverD, setRecieverD] = useState({});
  const [messages, setMessages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [cancelUploadDisable, setcancelUploadDisable] = useState(false);
  const [images, setImages] = useState([]);
  const [groupDeail, setGroupDetail] = useState([]);
  const messageEl = useRef(null);

  const [fileStatus, setFileStatus] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [alerted, setAlerted] = useState(false);

  const [tagModel, setTagModel] = useState(false);
  const [tagname, settagname] = useState("");
  const [tagList, settagList] = useState([]);

  const ref = useRef("");

  messages.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });

  const onchange = (event) => {
    const value = event.target.value;
    if (value.endsWith("@")) {
      setTagModel(true);
      APi.getAllUsers({
        Authorization: `Bearer ${getData("user").token}`,
      })
        .then((res) => {
          settagList([...res.data.data]);
        })
        .catch(() => {
          settagList([]);
        });
    }
    if (value === "") {
      setTagModel(false);
    }
    setText(value);
  };

  const closeTagModel = () => {
    setTagModel(false);
    settagname("");
  };

  const addTagName = (user) => {
    console.log("user", user);
    let addName = text + user.name + " ";
    setText(addName);
    setTagModel(false);
  };

  const tagNameFilter = (event) => {
    const value = event.target.value;
    settagname(value);

    APi.getAllUsers({
      Authorization: `Bearer ${getData("user").token}`,
    })
      .then((res) => {
        const list = [...res.data.data];
        const filterList = list.filter((item) => {
          if (item.name.match(value, "/gi")) {
            return item;
          }
        });
        settagList(filterList);
      })
      .catch(() => {
        settagList([]);
      });
  };

  useEffect(() => {
    // setMessages([]);
    if (recieverD && Object.keys(recieverD).length === 0) {
      // setSubmitted(true);
    } else {
      // setSubmitted(false);
    }
  }, [recieverD]);

  // select Group

  useEffect(() => {
    setMessages([]);
    const groupData = getData("selectedGroup");
    if (groupData && Object.keys(groupData).length !== 0) {
      // setSubmitted(true);
      setGroupDetail(groupData);
    } else {
      setGroupDetail({});
    }
    if (groupData && Object.keys(groupData).length !== 0) {
      const user = getData("user");
      socket.emit("messageGroupHistory", {
        sender: user.id,
        groupId: groupData.groupId,
        header: { auth_token: getData("user").token },
      });
    }
  }, [selectedGroup]);

  useEffect(() => {
    const user = getData("user");
    setCurrentUser(user);
  }, []);

  const sendData = () => {
    if (text !== "" && currentUser) {
      //final data
      let data = {
        sender: getData("user"),
        type: "chat",
        message: text,
        groupId: getData("selectedGroup").groupId,
        sentAt: new Date(),
      };

      data.header = {};
      data.header.auth_token = getData("user").token;
      console.log(data, "......###");
      socket.emit("groupMessages", data);
      setText("");
    }
  };

  useEffect(() => {
    socket.on("groupMessagesResponse", (message) => {
      console.log("mess", message);
      if (getData("selectedGroup")) {
        if (message.groupId === getData("selectedGroup").groupId) {
          let temp = {
            type: message.type ? message.type : null,
            sender: message.sender,
            text: message.message,
            date: moment(message.sendAt).format("YYYY-MM-DD HH:mm:ss"),
            filename: message.filename,
          };
          setMessages((prev) => {
            prev.push(temp);
            return prev;
          });

          setFileLoading(false);
          setOpenModal(false);
          setFiles([]);
        }
      }
    });
    socket.on("messageGroupHistoryResponse", (message) => {
      let temp = {
        type: message.type ? message.type : null,
        sender: message.sender,
        text: message.message,
        date: moment(message.sent_at).format("YYYY-MM-DD HH:mm:ss"),
        filename: message.filename,
      };
      setMessages((prev) => {
        prev.push(temp);
        return prev;
      });
      setFileLoading(false);
      setOpenModal(false);
      setFiles([]);
    });
  }, [socket]);

  // upload
  const addFile = (e) => {
    // setAlerted(false);
    const onlyFiles = [...files];
    const dd = files.findIndex((eee) => eee.name === e.file.originFileObj.name);
    if (e.file.type !== "") {
      if (dd === -1) {
        const fsize = e.file.size;
        const file = Math.round(fsize / 1024);
        if (file >= 4096) {
          if (alerted === false) {
            // message.error("please select a file less than 4mb");
            setAlerted(true);
          }
        } else {
          onlyFiles.push(e.file.originFileObj);
        }
      }
      setFiles([...onlyFiles]);
    } else {
      if (alerted === false) {
        // message.error("Unknown File Type !");
        setAlerted(true);
      }
    }
    setTimeout(() => {
      setAlerted(false);
    }, 2000);
  };

  const removeFile = (index) => {
    const dataList = files;
    dataList.splice(index, 1);
    setFiles([...dataList]);
    const fileStatusSet = fileStatus;
    fileStatusSet.splice(index, 1);
    setFileStatus([...fileStatusSet]);
  };

  // submit file

  const addWarroomFile = (imageFile) => {
    setcancelUploadDisable(true);
    setFileLoading(true);

    const f = [];

    imageFile.forEach((dd, index) => {
      f[index] = { index: index, image: dd };
    });

    if (currentUser && groupDeail) {
      const form = new FormData();
      imageFile.forEach((element) => {
        form.append("files", element);
      });
      form.append("sender", currentUser.id);
      form.append("groupId", groupDeail.groupId);
      form.append("type", "image");

      APi.groupFileUpload(form)
        .then((res) => {
          console.log(res, "fileResponse");
          const s = {};
          s.header = {};
          s.header.auth_token = getData("user").token;
          s.files = [...res.data.data];
          console.log(s);
          socket.emit("groupFileUpload", s);
          setOpenModal(false);
          setFileLoading(false);
          setFiles([]);
          setcancelUploadDisable(false);
        })
        .catch((err) => {
          console.error(err);
          setcancelUploadDisable(false);
        });
    }
  };

  // download logic

  const handleDonl = (file, filename) => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  // handle image download

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        handleDonl(res.data, filename);
      });
  };

  // image preview

  const openImageViewer = useCallback((index, i) => {
    setCurrentImage(index);
    setImages([i]);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setImages([]);
    setIsViewerOpen(false);
  };
  const imageupload = () => {
    const value = ref.current.click();
  };
  const onImageChange = (event) => {
    event.preventDefault();
    let files = event.target.files;

    let temp = [];
    for (let a in files) {
      temp.push(files[a]);
    }
    let aban = temp.splice(0, temp.length - 2);
    setImages(aban);
    addWarroomFile(aban);
  };
  return (
    <GroupStyle>
      {/* file upload input  */}
      <input
        type="file"
        onChange={(event) => onImageChange(event)}
        ref={ref}
        style={{ display: "none" }}
        multiple
      />
      <div className="chat">
        {userExist === false || Object.keys(groupDeail).length === 0 ? (
          <div className="nodata-page">
            <Icons type="moontech" />
            <span
              style={{
                fontWeight: "bolder",
                fontSize: "20px",
                color: "#70bde9",
              }}
            >
              No conversation selected
            </span>
          </div>
        ) : (
          <>
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
                  {groupDeail.groupName
                    ? `${groupDeail.groupName.charAt(0)}`
                    : null}
                </Avatar>
                {groupDeail.groupName && Object.keys(groupDeail).length !== 0
                  ? groupDeail.groupName
                  : "_ _ _"}
              </h2>
            </div>
            <div
              className="chat-message"
              ref={(ref) => {
                if (ref !== null) {
                  ref.addEventListener("DOMNodeInserted", (event) => {
                    const { currentTarget: target } = event;
                    target.scroll({
                      top: target.scrollHeight,
                      behavior: "smooth",
                    });
                  });
                }
              }}
            >
              {messages.map((i, index) => (
                <div
                  className={
                    i.sender.id === currentUser.id
                      ? "message mess-right"
                      : "message"
                  }
                  key={index}
                >
                  {i.type === "image" ? (
                    <>
                      <span>{i.sender.name}</span>

                      <p
                        className={
                          i.sender.id !== currentUser.id
                            ? "img hoverable"
                            : "img"
                        }
                      >
                        <img
                          src={`${i.text}`}
                          onClick={() => openImageViewer(0, i.text)}
                          alt="img"
                          style={{ cursor: "pointer" }}
                        />
                      </p>
                      {i.sender.id !== currentUser.id ? (
                        <>
                          <Icons
                            type="Download"
                            onClick={() => handleDownload(i.text, i.filename)}
                          />
                          <span>{i.date}</span>
                        </>
                      ) : (
                        <span style={{ marginTop: "3px", padding: "unset" }}>
                          <span>{i.date}</span>
                          <Icons
                            type="Download"
                            onClick={() => handleDownload(i.text, i.filename)}
                          />
                        </span>
                      )}
                    </>
                  ) : i.type === "file" ? (
                    <>
                      <span>{i.sender.name}</span>
                      <p
                        className={
                          i.sender.id !== currentUser.id
                            ? "img hoverable"
                            : "img"
                        }
                        style={{ width: "100%", height: "auto" }}
                      >
                        <span
                          style={{
                            display: "flex",
                            wordBreak: "break-all",
                          }}
                          className={
                            i.sender.id === currentUser.id
                              ? "fileType-right"
                              : "fileType"
                          }
                        >
                          <svg
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 80 80"
                            width="18px"
                            height="18px"
                          >
                            <path d="M 15 9 L 15 71 L 65 71 L 65 23.585938 L 50.414063 9 Z M 17 11 L 49 11 L 49 25 L 63 25 L 63 69 L 17 69 Z M 51 12.414063 L 61.585938 23 L 51 23 Z M 22 13 C 21.449219 13 21 13.449219 21 14 C 21 14.550781 21.449219 15 22 15 C 22.550781 15 23 14.550781 23 14 C 23 13.449219 22.550781 13 22 13 Z M 22 17 C 21.449219 17 21 17.449219 21 18 C 21 18.550781 21.449219 19 22 19 C 22.550781 19 23 18.550781 23 18 C 23 17.449219 22.550781 17 22 17 Z M 22 21 C 21.449219 21 21 21.449219 21 22 C 21 22.550781 21.449219 23 22 23 C 22.550781 23 23 22.550781 23 22 C 23 21.449219 22.550781 21 22 21 Z M 22 25 C 21.449219 25 21 25.449219 21 26 C 21 26.550781 21.449219 27 22 27 C 22.550781 27 23 26.550781 23 26 C 23 25.449219 22.550781 25 22 25 Z M 22 29 C 21.449219 29 21 29.449219 21 30 C 21 30.550781 21.449219 31 22 31 C 22.550781 31 23 30.550781 23 30 C 23 29.449219 22.550781 29 22 29 Z M 22 33 C 21.449219 33 21 33.449219 21 34 C 21 34.550781 21.449219 35 22 35 C 22.550781 35 23 34.550781 23 34 C 23 33.449219 22.550781 33 22 33 Z M 22 37 C 21.449219 37 21 37.449219 21 38 C 21 38.550781 21.449219 39 22 39 C 22.550781 39 23 38.550781 23 38 C 23 37.449219 22.550781 37 22 37 Z M 22 41 C 21.449219 41 21 41.449219 21 42 C 21 42.550781 21.449219 43 22 43 C 22.550781 43 23 42.550781 23 42 C 23 41.449219 22.550781 41 22 41 Z M 22 45 C 21.449219 45 21 45.449219 21 46 C 21 46.550781 21.449219 47 22 47 C 22.550781 47 23 46.550781 23 46 C 23 45.449219 22.550781 45 22 45 Z M 22 49 C 21.449219 49 21 49.449219 21 50 C 21 50.550781 21.449219 51 22 51 C 22.550781 51 23 50.550781 23 50 C 23 49.449219 22.550781 49 22 49 Z M 22 53 C 21.449219 53 21 53.449219 21 54 C 21 54.550781 21.449219 55 22 55 C 22.550781 55 23 54.550781 23 54 C 23 53.449219 22.550781 53 22 53 Z M 22 57 C 21.449219 57 21 57.449219 21 58 C 21 58.550781 21.449219 59 22 59 C 22.550781 59 23 58.550781 23 58 C 23 57.449219 22.550781 57 22 57 Z M 22 61 C 21.449219 61 21 61.449219 21 62 C 21 62.550781 21.449219 63 22 63 C 22.550781 63 23 62.550781 23 62 C 23 61.449219 22.550781 61 22 61 Z M 22 65 C 21.449219 65 21 65.449219 21 66 C 21 66.550781 21.449219 67 22 67 C 22.550781 67 23 66.550781 23 66 C 23 65.449219 22.550781 65 22 65 Z" />
                          </svg>
                          {i.filename}{" "}
                        </span>
                      </p>
                      {i.sender.id !== currentUser.id ? (
                        <>
                          <Icons
                            type="Download"
                            onClick={() => handleDownload(i.text, i.filename)}
                          />
                          <span>{i.date}</span>
                        </>
                      ) : (
                        <span style={{ marginTop: "3px", padding: "unset" }}>
                          <span>{i.date}</span>
                          <Icons
                            type="Download"
                            onClick={() => handleDownload(i.text, i.filename)}
                          />
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span>{i.sender.name}</span>
                      {i.sender.id !== currentUser.id ? (
                        <div style={{ display: "flex" }}>
                          <Avatars
                            size="30"
                            name={i.sender.name}
                            round={true}
                          />
                          <p>{i.text}</p>
                        </div>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <p>{i.text}</p>
                          <Avatars
                            googleId="118096717852922241760"
                            size="30"
                            name={i.sender.name}
                            round={true}
                          />
                        </div>
                      )}

                      <span>{i.date}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="send">
              <input
                placeholder="Enter Your Message"
                value={text}
                style={{
                  cursor: submitted ? "not-allowed" : "text",
                  opacity: submitted ? 0.5 : 1,
                }}
                disabled={submitted}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendData();
                  }
                }}
              ></input>
              <div className="btn-box1" onClick={() => imageupload()}>
                <Icons className="svgIcon" type="attachemt" />
              </div>
              <div
                className="btn-box"
                onClick={
                  !submitted
                    ? () => sendData()
                    : () =>
                        message.error({
                          content: "Select User to Send Message",
                        })
                }
              >
                <RiSendPlaneLine className="btn-icon" />
              </div>
            </div>
          </>
        )}

        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            onClose={closeImageViewer}
          />
        )}
        <ModalField
          visible={tagModel}
          title="Attachment"
          className="uploadmodal"
          onCancel={closeTagModel}
          footer={false}
        >
          <div
            style={{
              maxHeight: "100px",
              overflow: "auto",
              marginTop: "15px",
            }}
            className="overflowDiv"
          >
            <div>
              <input
                autoFocus
                value={tagname}
                onChange={(e) => tagNameFilter(e)}
              />
            </div>
            <div>
              <ScrollToBottom>
                {tagList.map((item) => (
                  <div onClick={() => addTagName(item)}>{item.name}</div>
                ))}
              </ScrollToBottom>
            </div>
          </div>
        </ModalField>
      </div>
    </GroupStyle>
  );
};

export default GroupChat;
