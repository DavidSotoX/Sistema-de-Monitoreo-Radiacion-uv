import React, { useEffect, useState } from "react";
import { GET } from "../../../../hooks/Conexion";
import { getToken } from "../../../../utilidades/Sessionutil";
import { Modal, Spinner } from "react-bootstrap";
import RegistrarDispositivo from "./Mod/RegistrarDispositivo";
import EditarDispositivo from "./Mod/EditarDispositivo";
import { useNavigate } from "react-router";
import generatePdf from "../../../Componentes/generatePdf";
const Devices = () => {
  const navegation = useNavigate();

  const [llDispositivos, setLlDispositivos] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [terminoBuscado, setTerminoBuscado] = useState("");
  const [buscarEstado, setBuscarEstado] = useState("");

  const [showRegistrarDispositivo, setShowRegistrarDispositivo] =
    useState(false);
  const [showEditarDispositivo, setShowEditarDispositivo] = useState(false);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);

  const [able, setAble] = useState(false);
  useEffect(() => {
    if (!llDispositivos) {
      GET("listar/api_dispositivo", getToken())
        .then((info) => {
          if (info.code !== 200) {
            console.error("Error en la respuesta:", info);
            setError("Error de Conexión | " + info.msg);
          } else {
            setDispositivos(info.info.dispositivos);
            setPromedio(info.info.promedio);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlDispositivos(true);
          setLoading(false);
        });
    }
  }, [llDispositivos, setLoading]);

  const BuscarDispositivo = (e) => {
    setTerminoBuscado(e.target.value);
  };

  const BuscarDispositivo_Estado = (e) => {
    setBuscarEstado(e.target.value);
  };

  const dispositivosFiltrados = dispositivos.filter((device) => {
    const estadoActivo = "ACTIVO";
    const estadoInactivo = "INACTIVO";
    const dispositivoBuscado =
      String(device.identificador)
        .toLowerCase()
        .includes(terminoBuscado.toLowerCase()) ||
      device.latitud.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      device.longitud.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      (terminoBuscado.toLowerCase() === estadoActivo.toLowerCase() &&
        device.activo) ||
      (terminoBuscado.toLowerCase() === estadoInactivo.toLowerCase() &&
        !device.activo);
    if (buscarEstado !== "Seleccionar") {
      if (buscarEstado === "ACTIVO") {
        return dispositivoBuscado && device.activo;
      }
      if (buscarEstado === "INACTIVO") {
        return dispositivoBuscado && !device.estado;
      }
      return dispositivoBuscado;
    }

    return dispositivoBuscado;
  });

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
            Dispositivos del Sistema
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
              Cargando Dispositivos...
            </h1>
          </div>
        ) : error ? (
          <>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"
              }
              alt="404"
              style={{ width: "19%" }}
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
                <input
                  style={{
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0)",
                    width: "100%",
                    height: "100%",
                    color: "white",
                    border: "1px solid white",
                  }}
                  type="search"
                  className="me-2"
                  placeholder={"Buscar Dispositivo"}
                  onChange={BuscarDispositivo}
                ></input>
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
                  onChange={BuscarDispositivo_Estado}
                >
                  <option
                    value="Seleccionar"
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  >
                    - - - -Seleccione- - - -
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="ACTIVO"
                  >
                    ACTIVO
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="INACTIVO"
                  >
                    INACTIVO
                  </option>
                </select>
              </div>

              <div
                className="col-3 "
                style={{
                  paddingBottom: "20px",
                }}
              >
                {able && (
                  <button
                    className="btn btn-outline-info"
                    style={{
                      borderRadius: "5px",
                      width: "100%",
                      height: "100%",
                      color: "white",
                      border: "1px solid white",
                    }}
                    onClick={() => setShowRegistrarDispositivo(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>{" "}
                    Registrar Dispositivo
                  </button>
                )}
              </div>

              <div
                className="col-3 "
                style={{
                  paddingBottom: "20px",
                }}
              >
                <button
                  className="btn btn-outline-info"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onClick={() => generatePdf(dispositivos, promedio)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-earmark-pdf-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"
                    />
                  </svg>{" "}
                  Generar Reporte
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
                    <th>ZONA</th>
                    <th>LATITUD</th>
                    <th>LONGITUD</th>
                    <th>ESTADO</th>
                    <th>MEDICIÓN UV</th>
                  </tr>
                </thead>
                <tbody>
                  {dispositivosFiltrados.map((device) => (
                    <tr
                      key={device.external_id}
                      style={{
                        borderBottom: "1px solid white",
                        borderRight: "1px solid white",
                        background: device.activo ? "#71b37147" : "#b3717147",
                      }}
                    >
                      <td style={{ padding: "5px" }}>
                        {device.nombre.toUpperCase()}
                      </td>
                      <td style={{ padding: "5px" }}>{device.latitud}</td>
                      <td style={{ padding: "5px" }}> {device.longitud}</td>
                      <td style={{ padding: "5px" }}>
                        {device.activo ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        {device.medicion.length > 0
                          ? device.medicion[device.medicion.length - 1].uv
                          : "0"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      <Modal
        show={showRegistrarDispositivo}
        onHide={() => setShowRegistrarDispositivo(false)}
        style={{ "--bs-modal-width": "40%" }}
        keyboard={false}
      >
        <RegistrarDispositivo setShow={setShowRegistrarDispositivo} />
      </Modal>
      <Modal
        show={showEditarDispositivo}
        onHide={() => setShowEditarDispositivo(false)}
        style={{ "--bs-modal-width": "40%" }}
        keyboard={false}
      >
        <EditarDispositivo
          setShow={setShowEditarDispositivo}
          dispositivo={dispositivoSeleccionado}
        />
      </Modal>
    </>
  );
};

export default Devices;
