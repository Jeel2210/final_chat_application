/* eslint-disable react/prop-types */
import React from "react";
import { Form } from "antd";
import { InputStyle } from "./InputStyle";
const InputDemo = (props) => {
  return (
    <>
      <InputStyle>
        <Form.Item
          className={props.validation ? "inputField" : null}
          name={props.name}
          label={props.label}
          dependencies={props.dependencies}
          hasFeedback={props.hasFeedback}
          rules={props.rules}
        >
          {props.Input}
        </Form.Item>
      </InputStyle>
    </>
  );
};
export default InputDemo;
