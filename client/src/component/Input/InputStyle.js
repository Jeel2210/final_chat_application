import styled from "styled-components";
export const InputStyle = styled.div`
  .ant-form-item-control-input-content > .ant-input {
    background-color: #e7f3f9;
    ${"" /* border: 1px solid #E8E8E8; */}
    color:black;
    font-size: 10px;
    font-weight: bolder;
    letter-spacing: 1px;
    :hover {
      background-color: #e7f3f9;
    }
    height: 35px;
    ::placeholder {
      font-size: 10px;
      opacity: 0.5;
      letter-spacing: 1px;
      font-weight: bolder;
      color: black !important;
    }
  }
  .inputField{
    margin-bottom: unset;
  }
  .ant-input {
    background-color: #e7f3f9;
    border-radius: 30px;
    color: black;
    font-size: 10px;
    font-weight: bolder;
    letter-spacing: 1px;
    :hover {
      background-color: #e7f3f9;
    }
    ::placeholder {
      font-size: 10px;
      font-weight: bolder;
      opacity: 0.5;
      letter-spacing: 1px;
      color: black !important;
    }
  }
  .ant-input-affix-wrapper {
    background-color: #e7f3f9;
    color: black;
    font-size: 10px;
    font-weight: bolder;
    letter-spacing: 1px;
    border-radius: 30px;
    :hover {
      background-color: #e7f3f9;
    }
    .ant-input {
      ::placeholder {
        font-size: 10px;
        opacity: 0.5;
        font-weight: bolder;
        letter-spacing: 1px;

        color: black !important;
      }
    }
  }
  .ant-input-password {
    background-color: #e7f3f9;
    ${"" /* border:1px solid #E8E8E8; */}
    color:black;
    height: 35px;
    :hover {
      background-color: #e7f3f9;
    }
    ::placeholder {
      font-size: 10px;
      font-weight: bolder;
      letter-spacing: 1px;
      opacity: 0.5;
      color: black !important;
    }
  }
  .ant-form-item-explain-error {
    font-size: 11px;
    font-weight: bolder;
    letter-spacing: 0.5px;
  }
  .ant-input-password-icon {
    color: black;
  }

  .ant-form-item-required {
    color: #979797;
    font-size: 16px;
  }
  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    content: "";
  }
  .ant-input::-webkit-outer-spin-button,
  .ant-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .ant-input[type="number"] {
    -moz-appearance: textfield;
  }
`;
