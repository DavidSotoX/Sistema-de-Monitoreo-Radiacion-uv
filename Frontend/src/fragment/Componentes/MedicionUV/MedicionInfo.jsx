import React from "react";
import { getCategoriaPorUV } from "./assets/MedicionUtils";

const MedicionInfo = (props) => {
  const { selectedUVData, promedio } = props;
  return (
    <div className="container text-right">
      <div className="row">
        <div className="container" style={{ padding: "20px " }}>
          <a
            style={{
              color: getCategoriaPorUV(
                selectedUVData ? selectedUVData.uv : promedio
              ).color,
              fontSize: "20px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            {
              getCategoriaPorUV(selectedUVData ? selectedUVData.uv : promedio)
                .tipo
            }
          </a>
        </div>

        <div />
        <div className="row">
          <a
            style={{
              color: "white",
              fontSize: "15px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            {
              getCategoriaPorUV(selectedUVData ? selectedUVData.uv : promedio)
                .descripcion
            }
          </a>
          <div />
        </div>
      </div>
    </div>
  );
};

export default MedicionInfo;
