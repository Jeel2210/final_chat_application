/* eslint-disable react/prop-types */
import React from "react";
import { Modal } from "antd";
const ModalField = (props) => {
  return (
    <>
      <Modal centered maskClosable={false} destroyOnClose={true} {...props}>
        {props.children}
      </Modal>
    </>
  );
};

export default ModalField;
