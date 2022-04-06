/* eslint-disable no-unused-vars */
import { Button, Col, Input, Row, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Comman from "../../component/Comman/Comman";
import InputDemo from "../../component/Input/InputDemo";
import { RegexList } from "../../component/RegexList";
import { setData } from "../../core/locaStorage/Local";
import "../home/home.scss";
import { RegisterStyle } from "./style";

const RegisterPage = ({ socket }) => {
  const [load, setLoad] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [animate, setanimate] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const [submitted, setSubmitted] = useState(true);
  const history = useHistory();

  const onfinish = (value) => {
    console.log("sdds");
    const res = RegexList.email.test(value.email);
    if (res === true) {
      setLoad(true);
      setSubmitData(value);
      setSubmitted(true);
      setLoad(true);
      socket.emit("register", value);
    } else {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    socket.on("userRegistration", (res) => {
      console.log(res, "response");
      if (res.status) {
        // socket.emit("login", { email: value.email, password: value.password });
        setSubmitData((prev) => {
          socket.emit("login", { email: prev.email, password: prev.password });
          return prev;
        });
        // seterrorMsg("");
        // history.push("/");
      } else if (res.status === false) {
        seterrorMsg(res.message);
        setLoad(false);
      }
    });
  }, [socket, history]);

  useEffect(() => {
    socket.on("userLogin", (res) => {
      if (res.status) {
        setLoad(false);
        setData("user", res.data);
        setData("status", true);
        seterrorMsg("");
        history.push("/chat");
      } else if (res.status === false) {
        seterrorMsg(res.message);
        setLoad(false);
      }
    });
  }, [socket, history]);

  const sendData = () => {
    seterrorMsg("");
  };
  const [form] = Form.useForm();

  useEffect(() => {
    setanimate(true);
  }, []);

  return (
    <RegisterStyle>
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
              animate
                ? "registerFrom animated ant-form-vertical "
                : "registerFrom ant-form-vertical"
            }
          >
            <h2>Welcome to Chat</h2>
            <h1>Register to ChatApp</h1>
            <InputDemo
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
              Input={<Input autoComplete="off" placeholder="Input Your Name" />}
            />
            <InputDemo
              name="username"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "Username is required",
                },
              ]}
              Input={
                <Input autoComplete="off" placeholder="Input Your User Name" />
              }
            />
            <InputDemo
              name="email"
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
                  onChange={() => {
                    setSubmitted(true);
                  }}
                  placeholder="Input Your Email"
                />
              }
            />
            {!submitted ? (
              <span className="errorMsg">Enter valid email</span>
            ) : null}{" "}
            <InputDemo
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                () => ({
                  validator(_, value) {
                    if (value && value.length >= 8) {
                      return Promise.resolve();
                    }
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (value.length < 8) {
                      return Promise.reject(
                        new Error(
                          "please enter at least 8 characters long password."
                        )
                      );
                    }
                    // if (value.length >= 20) {
                    //   return Promise.reject(
                    //     new Error("please enter less then 20 characters.")
                    //   );
                    // }
                    // if (
                    //   value &&
                    //   value.length <= 8
                    //   // RegexList.password.test(value) &&
                    //   // /^\S*$/.test(value)
                    // ) {
                    //   return Promise.resolve();
                    // }
                    // if (!value) {
                    //   return Promise.resolve();
                    // }

                    // return Promise.reject(
                    //   new Error(
                    //     "please enter at least 8 characters long password."
                    //   )
                    // );
                  },
                }),
              ]}
              Input={
                <Input.Password
                  autoComplete="off"
                  placeholder="Input Your Password"
                />
              }
            />
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={load}
                  onClick={sendData}
                >
                  Register Now
                </Button>
              )}
            </Form.Item>
            <NavLink
              to="/"
              style={{ textAlign: "center", display: "block", float: "unset" }}
            >
              Already have an Account !
            </NavLink>
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
              </div>
            ) : null}
          </Form>
        </Col>
      </Row>
    </RegisterStyle>
  );
};

export default RegisterPage;
