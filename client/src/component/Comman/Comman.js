import React from "react";
import Icons from "../Icons/Icons";
import { CommanStyle } from "./CommanStyle";

const Comman = () => {
  return (
    <>
      <CommanStyle>
        <div className="MainDiv">
          <Icons type="moontech" />
          <div className="desc">
            <p>
              We are MoonTechnolabs, Our obsession to engineer robust &
              meaningful solutions drives us forward every day. We are the
              company where passion meets detailed engineering.
            </p>
            <p>
              Our ChatApp provide you best platform for communication and your
              conversation is secure becuase we provide end to end Encryption.
            </p>
          </div>
        </div>
      </CommanStyle>
    </>
  );
};

export default Comman;
