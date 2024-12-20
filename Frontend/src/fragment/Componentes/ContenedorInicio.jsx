import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import generatePdf from "./generatePdf";
import MapView from "./Mapa/MapaView";
import MedicionView from "./MedicionUV/MedicionView";
import { Button } from "reactstrap";
import { GET } from "../../hooks/Conexion";
import { getToken } from "../../utilidades/Sessionutil";
import GraficoHistorico from "./Graficos/GraficoHistorico";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContenedorInicio = (props) => {
  const { isAdmin } = props;
  const [llDispositivos, setLlDispositivos] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [recomendacion, setRecomendacion] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUVData, setSelectedUVData] = useState(null);

  useEffect(() => {
    if (!llDispositivos) {
      GET("listar/api_dispositivo", getToken())
        .then((info) => {
          var dispositivos, promedio, recomendacion;
          dispositivos = info.info.dispositivos;
          recomendacion = info.info.categorias;
          promedio = info.info.promedio;
          
    
          if (info.code !== 200) {
            setError("Error de Conexión:  " + info.msg);
          } else {
            setPromedio(promedio);
            setDispositivos(dispositivos);
            setRecomendacion(recomendacion);
            setLoading(false);
            if (promedio >= 11) {
              toast.error(`Atención: Se ha registrado un nivel de radiación Extremadamente alto. Recomendación: ${recomendacion[4].descripcion}`);
            } else if (promedio >= 8 && promedio < 11) {           
              toast.warning(`Atención: Se ha registrado un nivel de radiación Muy Alto. Recomendación: ${recomendacion[3].descripcion}`);
            } else if (promedio >=6 && promedio < 8) {                  
              toast.success(`Se ha registrado un nivel de radiación Alto. Recomendación: ${recomendacion[2].descripcion}`);
            } else if (promedio >= 3  && promedio < 6) {                     
              toast.warning(`Atención: Se ha registrado un nivel de radiación Moderado. Recomendación: ${recomendacion[1].descripcion}`);
            } else if (promedio >= 0 && promedio < 3) {   
              toast.warning(`Atención: Se ha registrado un nivel de radiación bajo. Recomendación: ${recomendacion[0].descripcion}`);
            }
          }
        })
        .catch((e) => {
          console.error(e);
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlDispositivos(true);
          
        });
    }
  }, [llDispositivos, promedio, recomendacion]);



  const handleGeneratePdf = () => {
    generatePdf(dispositivos, promedio); // Llamamos a la función para generar el PDF con los dispositivos y el promedio
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div
          className="row justify-content-center"
          style={{ padding: "100px", scale: "1" }}
        >
          <Spinner
            style={{ width: "100px", height: "100px" }}
            animation="border"
            variant="success"
          />
          <h1
            style={{
              color: "white",
              fontSize: "25px",
              fontFamily: "Arial",
              fontWeight: "600",
              borderBottom: "1px solid #e20613",
            }}
          >
            Cargando datos...
          </h1>
        </div>
      ) : error ? (
        <>
          <img
            src={"https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"}
            alt="404"
            style={{ width: "20%" }}
          />
          <h1
            style={{
              color: "red",
              fontSize: "25px",
              fontFamily: "Arial",
              fontWeight: "600",
            }}
          >
            {error}
          </h1>
        </>
      ) : (
        llDispositivos &&
        dispositivos.length > 0 && (
          <div className="row">
            <div className="col-6 ">
              <MapView
                dispositivos={dispositivos}
                setSelectedUVData={setSelectedUVData}
              />
            </div>
            <div className="col-6">
              <MedicionView
                dispositivos={dispositivos}
                selectedUVData={selectedUVData}
                promedio={promedio}
              />
            </div>
            <div
              className="row justify-content-center"
              style={{ padding: "28px" }}
            >
              <GraficoHistorico
                radiacionUVDispositivoActual={dispositivos.map(
                  (dispositivo) => dispositivo.medicion[0].uv
                )}
                dispositivos={dispositivos}
                radiacionUVPromedio={promedio}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ContenedorInicio;
