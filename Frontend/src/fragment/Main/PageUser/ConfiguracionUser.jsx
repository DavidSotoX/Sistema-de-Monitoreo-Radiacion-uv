import React from "react";
import UserOption from "./Gestionar Usuario/UserOption";
import TokenOption from "./Gestionar Tokens/TokenOption";
import DeviceOption from "./Gestionar Dispositivos/DeviceOption";

const FuncionesAdmin = (props) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-5">
          <h1
            style={{
              color: "white",
              fontSize: "48px",
              fontFamily: "Arial",
              fontWeight: "600",
              borderBottom: "3px solid #e20613",
            }}
          >
            Gestionar
          </h1>
        </div>
      </div>

      <div
        className="row justify-content-between "
        style={{
          padding: "100px",
          alignItems: "center",
        }}
      >
        <UserOption user={props.user} />
        <DeviceOption user={props.user} />
        <TokenOption user={props.user} />
      </div>
    </>
  );
};
export default FuncionesAdmin;
