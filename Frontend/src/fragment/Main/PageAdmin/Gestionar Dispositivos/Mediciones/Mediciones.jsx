import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { GET } from "../../../../../hooks/Conexion";
import { getToken } from "../../../../../utilidades/Sessionutil";
import { useLocation } from "react-router";

const Mediciones = () => {
  const location_props = useLocation();
  const [llMediciones, setLlMediciones] = useState(false);
  const [mediciones, setMediciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!llMediciones) {
      if (!location_props.state) {
        GET("listar/medicion", getToken())
          .then((info) => {
            if (info.code !== 200) {
              console.error("Error en la respuesta:", info);
              setError("Error de Conexión | " + info.msg);
            } else {
              setMediciones(info.info);
              console.log(info.info);
            }
          })
          .catch((error) => {
            console.error(error);
            setError("Error de Conexión");
          })
          .finally(() => {
            setLlMediciones(true);
            setLoading(false);
          });
      } else {
        GET(`listar/medicion/${location_props.state.external_id}`, getToken())
          .then((info) => {
            console.log(info);
            if (info.code !== 200) {
              console.error("Error en la respuesta:", info);
              setError("Error de Conexión | " + info.msg);
            } else {
              setMediciones(info.info);
            }
          })
          .catch((error) => {
            console.error(error);
            setError("Error de Conexión");
          })
          .finally(() => {
            setLlMediciones(true);
            setLoading(false);
          });
      }
    }
  }, [llMediciones, setLoading]);

  const [filtroFecha, setFiltroFecha] = useState("Seleccionar");
  const [filtroHora, setFiltroHora] = useState("Seleccionar");
  const [filtroRadiacion, setFiltroRadiacion] = useState("Seleccionar");

  const medicionesFiltradas = mediciones
    .filter((medicion) => {
      let fechaMedicion = new Date(medicion.createdAt)
        .toISOString()
        .split("T")[0];
      let horaMedicion = new Date(medicion.fecha).toLocaleTimeString("es-EC", {
        hour12: false,
      });

      // Aplicar filtro de fecha
      if (filtroFecha !== "Seleccionar") {
        const hoy = new Date().toISOString().split("T")[0];
        const ultimoMes = new Date();
        ultimoMes.setMonth(ultimoMes.getMonth() - 1);
        const ultimoMesStr = ultimoMes.toISOString().split("T")[0];

        switch (filtroFecha) {
          case "ULTIMO_MES":
            if (fechaMedicion < hoy && fechaMedicion >= ultimoMesStr) {
              return true;
            }
            break;
          case "ULTIMOS_7_DIAS":
            const ultimo7Dias = new Date();
            ultimo7Dias.setDate(ultimo7Dias.getDate() - 7);
            const ultimo7DiasStr = ultimo7Dias.toISOString().split("T")[0];
            if (fechaMedicion < hoy && fechaMedicion >= ultimo7DiasStr) {
              return true;
            }
            break;
          case "AYER":
            const ayer = new Date();
            ayer.setDate(ayer.getDate() - 1);
            const ayerStr = ayer.toISOString().split("T")[0];
            if (fechaMedicion === ayerStr) {
              return true;
            }
            break;
          case "HOY":
            if (fechaMedicion === hoy) {
              return true;
            }
            break;
          default:
            break;
        }
      }

      // Aplicar filtro de hora
      if (filtroHora !== "Seleccionar") {
        switch (filtroHora) {
          case "ULTIMA_HORA":
            const ultimaHora = new Date();
            ultimaHora.setHours(ultimaHora.getHours() - 1);
            if (new Date(medicion.fecha) >= ultimaHora) {
              return true;
            }
            break;
          case "ULTIMOS_10_MINUTOS":
            const ultimos10Min = new Date();
            ultimos10Min.setMinutes(ultimos10Min.getMinutes() - 10);
            if (new Date(medicion.fecha) >= ultimos10Min) {
              return true;
            }
            break;
          default:
            break;
        }
      }
      if (filtroRadiacion !== "Seleccionar") {
        switch (filtroRadiacion) {
          case "MAYOR_RADIACION":
            return true; // Include all measurements, will be sorted later

          case "MENOR_RADIACION":
            return true; // Include all measurements, will be sorted later

          default:
            break;
        }
      }
      return true;
    })
    .sort((a, b) => {
      // Ordenar las mediciones según el nivel de radiación
      switch (filtroRadiacion) {
        case "MAYOR_RADIACION":
          return b.uv - a.uv; // Ordenar de mayor a menor

        case "MENOR_RADIACION":
          return a.uv - b.uv; // Ordenar de menor a mayor

        default:
          return 0;
      }
    });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = medicionesFiltradas.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-5">
          <h1
            style={{
              color: "white",
              fontSize: "40px",
              fontFamily: "Arial",
              fontWeight: "600",
              borderBottom: "3px solid #e20613",
            }}
          >
            Historial de Mediciones
          </h1>
        </div>
      </div>
      <div className="row">
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
              Cargando Mediciones...
            </h1>
          </div>
        ) : error ? (
          <>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"
              }
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
          llMediciones &&
          mediciones.length > 0 && (
            <div
              className="row"
              style={{
                scale: "1",
                padding: "50px",
                fontFamily: "Arial",
                fontWeight: "600",
              }}
            >
              <div
                className="col-3"
                style={{
                  paddingBottom: "20px",
                }}
              >
                <select
                  defaultValue="Seleccionar"
                  className="form-select form-select-lg text-center"
                  style={{
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0)",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                >
                  <option
                    value="Seleccionar"
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  >
                    - - - -Seleccione- - - -
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="ULTIMO_MES"
                  >
                    ÚLTIMO MES
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="ULTIMOS_7_DIAS"
                  >
                    ÚLTIMOS 7 DÍAS
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="AYER"
                  >
                    AYER
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="HOY"
                  >
                    HOY
                  </option>
                </select>
              </div>
              <div
                className="col-3"
                style={{
                  paddingBottom: "20px",
                }}
              >
                <select
                  defaultValue="Seleccionar"
                  className="form-select form-select-lg text-center"
                  style={{
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0)",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onChange={(e) => setFiltroHora(e.target.value)}
                >
                  <option
                    value="Seleccionar"
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  >
                    - - - -Seleccione- - - -
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="ULTIMA_HORA"
                  >
                    ÚLTIMA HORA
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="ULTIMOS_10_MINUTOS"
                  >
                    ÚLTIMOS 10 MINUTOS
                  </option>
                </select>
              </div>
              <div
                className="col-3 "
                style={{
                  paddingBottom: "20px",
                }}
              >
                <select
                  defaultValue="Seleccionar"
                  className="form-select form-select-lg text-center"
                  style={{
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0)",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onChange={(e) => setFiltroRadiacion(e.target.value)}
                >
                  <option
                    value="Seleccionar"
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  >
                    - - - -Seleccione- - - -
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="MAYOR_RADIACION"
                  >
                    MAYOR RADIACIÓN
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="MENOR_RADIACION"
                  >
                    MENOR RADIACIÓN
                  </option>
                </select>
              </div>
              <div
                className="col-3 "
                style={{
                  paddingBottom: "20px",
                }}
              >
                <button
                  className="btn btn-outline-danger"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    color: "white",
                    border: "1px solid white",
                  }}
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-clock-history"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                  </svg>{" "}
                  Borrar Historial de Mediciones
                </button>
              </div>
              <table
                style={{
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0)",
                  color: "white",
                  border: "1px solid white",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      fontSize: "16px",
                      borderBottom: "2px solid white",
                    }}
                  >
                    <th>FECHA MEDICION</th>
                    <th>HORA MEDICION</th>
                    <th>MEDICIÓN UV</th>
                    <th>IDENTIFICADOR DISPOSITIVO</th>
                    <th>ESTADO DISPOSITIVO</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((medicion) => (
                    <tr
                      key={medicion.external_id}
                      style={{
                        borderBottom: "1px solid white",
                        borderRight: "1px solid white",
                      }}
                    >
                      <td style={{ padding: "5px" }}>
                        {
                          new Date(medicion.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>
                      <td style={{ padding: "5px" }}>
                        {new Date(medicion.fecha).toLocaleTimeString("es-EC", {
                          hour12: false,
                        })}
                      </td>
                      <td style={{ padding: "5px" }}>{medicion.uv}</td>
                      <td style={{ padding: "5px" }}>
                        {medicion.dispositivo.identificador}
                      </td>
                      <td style={{ padding: "5px" }}>
                        {medicion.dispositivo.estado ? "ACTIVO" : "INACTIVO"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                {Array.from(
                  {
                    length: Math.ceil(
                      medicionesFiltradas.length / recordsPerPage
                    ),
                  },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(medicionesFiltradas.length / recordsPerPage)
                  }
                >
                  Siguiente
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Mediciones;
