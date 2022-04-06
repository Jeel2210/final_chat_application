import styled from "styled-components";
export const HomeStyle = styled.div`
  .homepage {
    width: 500px;
    height: 500px;
    padding: 2rem;
    background-color: #2d343e;
    display: flex;
    // justify-content: space-evenly;
    flex-direction: column;
    border-radius: 5px;
    h1 {
      margin: 50px auto;
    }

    input {
      height: 50px;
      width: 80%;
      background-color: #404450;
      border: none;
      padding-left: 1rem;
      border-radius: 5px;
      &:focus {
        outline: none;
      }
    }
    .input2 {
      margin: 50px auto 0px auto;
    }

    button {
      font-size: 1rem;
      padding: 0.5rem 1rem 0.5rem 1rem;
      width: 100px;
      border: none;
      margin: 2rem auto;
      background-color: #ffac41;
      border-radius: 5px;

      color: black;
      &:hover {
        cursor: pointer;
      }
    }
    .errorMsg {
      color: red !important;
      font-size: 13px;
      margin-left: 3rem;
      font-family: monospace;
      margin-top: 5px;
      font-weight: bolder;
      letter-spacing: 1px;
    }
  }

  a {
    float: right;
    color: #40a9ff;
    font-size: 14px;
    font-weight: bold;
  }
  .errorMsg {
    color: #ff4d4f;
    font-size: 13px;
    letter-spacing: 0.5px;
    font-weight: bolder;
    font-family: "Roboto", sans-serif;
  }
  .ant-btn {
    background: #04c35c;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 6px;
    color: #ffffff;
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
  }
  .ant-form-item-control-input-content > .ant-input {
    font-size: 15px;
    height: 45px;
  }

  .ant-input-password {
    height: 45px;
    input {
      font-size: 15px;
    }
  }
  .ant-form-item-explain-error {
    font-size: 12px;
  }
  h2 {
    color: black;
    font-weight: bolder;
    margin: 0px;
    letter-spacing: 2px;
  }
  .ant-form-item-required {
    color: black;
    font-size: 13px;
    font-weight: bolder;
    letter-spacing: 1.5px;
  }
  .ant-form-vertical .ant-form-item-label,
  .ant-col-24.ant-form-item-label,
  .ant-col-xl-24.ant-form-item-label {
    padding: 0 0 5px;
  }
  h1 {
    font-weight: bold;
    font-size: 30px;
    color: #40a9ff;
    // letter-spacing: 1px;
  }

  @keyframes example {
    0% {
      opacity: 0;
      left: 0%;
      top: -20%;
    }
    100% {
      opacity: 1;
      left: 0%;
      top: 0%;
    }
  }
  .ant-form {
    animation-duration: 2s;
    animation-name: example;
    position: relative;
    padding: 33px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 4px 4px 25px rgb(42 139 242 / 15%),
      2px 2px 25px rgb(42 139 242 / 5%), 4px 6px 10px rgb(42 139 242 / 15%);
    margin-top: 50%;
    .ant-input {
      ::placeholder {
        font-size: 15px;
        color: #ffffff;
      }
    }
    .ant-btn {
      // background-color: #40a9ff;
      background: linear-gradient(96.78deg, #7cb8f7 0%, #2a8bf2 100%);
      border-radius: 40px;
      height: 45px;
      span {
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .ant-form {
      margin-top: 10%;
    }
  }
  @media only screen and (max-width: 990px) {
    .ant-form {
      margin-top: 10px;
      margin-left: 18px;
    }
  }
`;