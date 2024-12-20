import React from "react";
import ConfigOption from "./ConfigOption";

const ConfiguracionUsuario = (props) => {
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
            Configuración
          </h1>
        </div>
      </div>

      <div
        className={"row justify-content-between"}
        style={{
          padding: "100px",
          alignItems: "center",
        }}
      >
        <ConfigOption user={props.user} numberOption={1} />
        <ConfigOption user={props.user} numberOption={2} />
        <ConfigOption user={props.user} numberOption={3} />
      </div>
    </>
  );
};

export default ConfiguracionUsuario;
