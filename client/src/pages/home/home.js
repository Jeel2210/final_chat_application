import { Button, Col, Input, Row, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Comman from "../../component/Comman/Comman";
import InputDemo from "../../component/Input/InputDemo";
// import "../home/home.scss";
import { HomeStyle } from "./HomeStyle";
import { setData } from "../../core/locaStorage/Local";
import { RegexList } from "../../component/RegexList";

const Homepage = ({ socket, setrenderpage }) => {
  const [load, setLoad] = useState(false);
  const [animate, setanimate] = useState(false);
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(true);
  const history = useHistory();

  const onfinish = (value) => {
    console.log(submitted);
    const res = RegexList.email.test(value.username);
    if (res === true) {
      setSubmitted(true);
      setLoad(true);
      socket.emit("login", {
        email: value.username,
        password: value.password,
      });
    } else {
      setSubmitted(false);
    }
  };

  const sendData = () => {
    if (username !== "" && roomname !== "") {
      setLoad(false);
      setrenderpage(true);
    } else {
      setLoad(false);
    }
  };

  useEffect(() => {
    socket.on("userLogin", (res) => {
      console.log(res, "response");
      if (res.status) {
        setLoad(false);
        setData("user", res.data);
        setData("status", true);
        history.push("/chat");
      } else if (res.status === false) {
        setErrorMsg(res.message);
        setLoad(false);
      }
    });
  }, [socket, history]);

  const [form] = Form.useForm();

  useEffect(() => {
    setanimate(true);
  }, []);

  return (
    <HomeStyle>
      <Row>
        <Col lg={{ span: 10, offset: 2 }} xs={{ span: 16, offset: 2 }}>
          <Comman />
        </Col>
        <Col lg={{ span: 6, offset: 3 }} xs={{ span: 16, offset: 3 }}>
          <Form
            form={form}
            onFinish={onfinish}
            name="basic"
            validateMessages={{
              types: {
                email: "Enter Valid Email !",
              },
            }}
            initialValues={{ remember: true }}
            className={
              animate ? "animated ant-form-vertical" : " ant-form-vertical"
            }
          >
            <h2>Welcome to Chat</h2>
            <h1>Login To ChatApp</h1>
            <InputDemo
              name="username"
              label="Email"
              validation={!submitted ? true : false}
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
              ]}
              Input={
                <Input
                  autoComplete="off"
                  style={{
                    border: !submitted ? "1px solid #ff7875" : null,
                    borderRightColor: !submitted ? "1px" : null,
                    boxShadow: !submitted
                      ? "0 0 0 2px rgb(255 77 79 / 20%)"
                      : null,
                  }}
                  placeholder="Input Your Email"
                  onChange={(e) => {
                    setusername(e.target.value);
                    setSubmitted(true);
                  }}
                />
              }
            />
            {!submitted ? (
              <span className="errorMsg">Enter Valid Email</span>
            ) : null}{" "}
            <InputDemo
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
              Input={
                <Input.Password
                  autoComplete="off"
                  placeholder="Input Your Password"
                  onChange={(e) => setroomname(e.target.value)}
                />
              }
            />
            <NavLink to="/register">Register User</NavLink>
            <br />
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={load}
                  onClick={sendData}
                >
                  Login Now
                </Button>
              )}
            </Form.Item>
            {errorMsg !== "" ? (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                {errorMsg}
                <sup>*</sup>
              </div>
            ) : null}
          </Form>
        </Col>
      </Row>
    </HomeStyle>
  );
};

export default Homepage;
