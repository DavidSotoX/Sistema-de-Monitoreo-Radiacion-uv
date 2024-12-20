import React from "react";
import { formatearFechaYHora, getCategoriaPorUV } from "./assets/MedicionUtils";

const MedicionUV = (props) => {
  const { selectedUVData, promedio } = props;
  return (
    <div
      className="container text-center"
      style={{
        width: "90%",
        height: "100%",
        background: "rgba(19, 35, 64, 0.7)",
        borderRadius: "10px",
      }}
    >
      <div className="row justify-content-center">
        <a
          style={{
            color: "white",
            fontSize: "25px",
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          UV
        </a>
        <a style={{ color: "white", fontSize: "15px" }}>
          {selectedUVData ? selectedUVData.name.toUpperCase() : "PROMEDIO"}
        </a>
        <a
          style={{
            color: getCategoriaPorUV(
              selectedUVData ? selectedUVData.uv : promedio
            ).color,
            fontSize: "95px",
            fontFamily: "Agency FB",
          }}
        >
          {selectedUVData ? selectedUVData.uv : promedio}
        </a>
      </div>
      <div>
        <label
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "17px",
            color: "white",
            width: "60%",
          }}
        >
          {selectedUVData
            ? formatearFechaYHora(selectedUVData.fecha)
            : formatearFechaYHora()}
        </label>
      </div>
    </div>
  );
};

export default MedicionUV;
