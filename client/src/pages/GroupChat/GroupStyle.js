import styled from "styled-components";
export const GroupStyle = styled.div`
  // .chat-message {
  .chat-message::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .chat-message::-webkit-scrollbar-thumb {
    background: #1890ff !important;
    border-radius: 10px !important;
  }

  .chat-message::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 10px !important;
  }
  button {
    display: none !important;
  }
  // }
`;
