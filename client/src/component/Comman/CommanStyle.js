import styled from "styled-components";
export const CommanStyle = styled.div`
  svg {
    width: 250px;
  }
  p {
    font-size: 14px;
    margin-top: 25px;
    font-weight: bolder;
    color: black;
    letter-spacing: 1px;
  }
  .MainDiv {
    margin-top: 40%;
    margin-left: 10%;
  }
  @media only screen and (max-width: 600px) {
    .desc {
      display: none;
    }
    img {
      width: 200px;
    }
  }
`;
