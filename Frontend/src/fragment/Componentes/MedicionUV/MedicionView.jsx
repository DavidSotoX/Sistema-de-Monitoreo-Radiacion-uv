import React from "react";
import MedicionUV from "./MedicionUV";
import MedicionInfo from "./MedicionInfo";
import CategoriasExposicion from "../Tablas/CategoriasExposicion";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import Recomendaciones from "../Tablas/Recomendaciones";
const MedicionView = (props) => {
  const { selectedUVData, promedio } = props;
  return (
    <div
      className="card"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "rgba(19, 35, 64, 0.7)",
      }}
    >
      <div className="card-header">
        <h3
          className="card-title text-center"
          style={{ fontWeight: "bold", color: "white" }}
        >
          Medición
        </h3>
      </div>
      <div className="card-body">
        <div className="row ">
          <div className="col-5">
            <MedicionUV selectedUVData={selectedUVData} promedio={promedio} />
          </div>
          <div className="col-sm">
            <div className="row">
              <MedicionInfo
                selectedUVData={selectedUVData}
                promedio={promedio}
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div
            className="col"
            style={{
              padding: 22,
            }}
          >
            <MDBCarousel showControls showIndicators>
              <MDBCarouselItem itemId={1}>
                <CategoriasExposicion />
              </MDBCarouselItem>
              <MDBCarouselItem itemId={2}>
                <Recomendaciones />
              </MDBCarouselItem>
            </MDBCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicionView;
