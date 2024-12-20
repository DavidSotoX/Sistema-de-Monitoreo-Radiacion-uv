import React, { useEffect, useState } from "react";
import { GET, POST } from "../../../../hooks/Conexion";
import { getToken } from "../../../../utilidades/Sessionutil";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import mensajes from "../../../../utilidades/Mensajes";
import AsignarToken from "./Mod/AsignarToken";
import RegistrarToken from "./Mod/RegistrarToken";
const Solicitudes = (props) => {
  const navegation = useNavigate();
  const [llToken, setLlToken] = useState(false);
  const [tokens, setTokens] = useState([]);

  const [llUsuarios, setLlUsuarios] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAsignarToken, setShowAsignarToken] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  const [showRegistrarToken, setShowRegistrarToken] = useState(false);

  useEffect(() => {
    if (!llToken) {
      GET("listar/peticion_token", getToken())
        .then((info) => {
          if (info.code !== 200) {
            console.error("Error en la respuesta:", info);
            setError("Error de Conexión | " + info.msg);
          } else {
            setTokens(info.info);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlToken(true);
          setLoading(false);
        });
    }
  }, [llToken, setLoading]);

  useEffect(() => {
    if (!llUsuarios) {
      GET("listar/persona", getToken())
        .then((info) => {
          console.log(info);
          if (info.code !== 200) {
            console.error("Error en la respuesta:", info);
          } else {
            setUsuarios(info.info);
            const usuariosAceptados = info.info.filter(
              (user) =>
                user.cuenta.estado === "EN ESPERA" ||
                user.cuenta.estado === "RECHAZADO"
            );
            setUsuarios(usuariosAceptados);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlUsuarios(true);
          setLoading(false);
        });
    }
  }, [llUsuarios, setLoading]);

  const [tokenEstado, setTokenEstado] = useState("Seleccionar");
  const Filtrar_Token_Estado = (e) => {
    setTokenEstado(e.target.value);
  };

  const [usuarioAPIEstado, setUsuarioAPIEstado] = useState("Seleccionar");
  const Filtro_APISTATUS_Estado = (e) => {
    setUsuarioAPIEstado(e.target.value);
  };

  const tokensFiltrados = tokens.filter((token) => {
    if (tokenEstado != "Seleccionar") {
      if (tokenEstado === "HABILITADO") {
        return token.habilitado === true;
      }
      if (tokenEstado === "DESHABILITADO") {
        return token.habilitado === false;
      }
    }
    return token;
  });
  const usuariosFiltrados = usuarios.filter((user) => {
    if (usuarioAPIEstado != "Seleccionar") {
      if (usuarioAPIEstado === "EN ESPERA") {
        return user.cuenta.estado === "EN ESPERA";
      }
      if (usuarioAPIEstado === "RECHAZADO") {
        return user.cuenta.estado === "RECHAZADO";
      }
    }
    return user;
  });
  function EditStatusToken(external_token, habilitado) {
    const datos = {
      habilitado: habilitado,
    };

    POST(datos, `guardar/peticion_token/${external_token}`, getToken())
      .then((info) => {
        if (info.code !== 200) {
          mensajes("Hubo un error en la edicion", "error", "Error");
        } else {
          setTokens((prevTokens) => {
            const updatedTokens = prevTokens.map((token) =>
              token.external_id === external_token
                ? { ...token, habilitado: habilitado }
                : token
            );
            return updatedTokens;
          });
        }
      })
      .catch(() => {
        mensajes("Hubo un error en el registro", "error", "Error");
      });
  }

  function RechazarSolicitudUsuario(external_persona) {
    const datos = {
      estado: "RECHAZADO",
    };

    POST(datos, `guardar/persona/${external_persona}`, getToken())
      .then((info) => {
        if (info.code !== 200) {
          mensajes("Hubo un error en la edicion", "error", "Error");
        } else {
          setUsuarios((prevUsuarios) => {
            const updatedUsuarios = prevUsuarios.map((user) =>
              user.external_id === external_persona
                ? { ...user, cuenta: { ...user.cuenta, estado: datos.estado } }
                : user
            );
            return updatedUsuarios;
          });
        }
      })
      .catch(() => {
        mensajes("Hubo un error en el registro", "error", "Error");
      });
  }

  function mostrarArchivo(description_pdf) {
    var url = `http://localhost:3006/docs/solicitudes/${description_pdf}`;
    window.open(url, "_blank");
  }
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
            Solicitudes de Tokens API
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
                onChange={Filtrar_Token_Estado}
              >
                <option
                  value="Seleccionar"
                  style={{ background: "rgba(0, 0, 0, 0.7)" }}
                >
                  - - - -Seleccione- - - -
                </option>
                <option
                  style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  value="HABILITADO"
                >
                  HABILITADO
                </option>
                <option
                  style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  value="DESHABILITADO"
                >
                  DESHABILITADO
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
                className="btn btn-outline-info"
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "100%",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => setShowRegistrarToken(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-key-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>{" "}
                Nuevo Token
              </button>
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
                onChange={Filtro_APISTATUS_Estado}
              >
                <option
                  value="Seleccionar"
                  style={{ background: "rgba(0, 0, 0, 0.7)" }}
                >
                  - - - -Seleccione- - - -
                </option>
                <option
                  style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  value="EN_ESPERA"
                >
                  EN ESPERA
                </option>
                <option
                  style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  value="RECHAZADO"
                >
                  RECHAZADO
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
                className="btn btn-outline-info"
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "100%",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() =>
                  navegation("/admin/gestion/usuarios", {
                    state: {
                      user: props.user,
                      dispositivos: props.dispositivos,
                    },
                    isAdmin: true,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                </svg>{" "}
                Ver Todos los Usuarios
              </button>
            </div>
            <div className="col-6">
              <div className="row">
                <h3
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontFamily: "Arial",
                    fontWeight: "600",
                    borderBottom: "3px solid #e20613",
                  }}
                >
                  Tokens API
                </h3>
              </div>
              <div className="row">
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
                      <th>API KEY</th>
                      <th>ESTADO</th>
                      <th>NRO. PETICIONES</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokensFiltrados.map((token) => (
                      <tr
                        key={token.external_id}
                        style={{
                          borderBottom: "1px solid white",
                          borderRight: "1px solid white",
                          background: token.habilitado
                            ? "#71b37147"
                            : "#b3717147",
                        }}
                      >
                        <td style={{ padding: "5px" }}>{token.external_id}</td>
                        <td style={{ padding: "5px" }}>
                          {token.habilitado ? "Habilitado" : "Deshabilitado"}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {" "}
                          {token.nro_peticiones}
                        </td>
                        <td style={{ padding: "5px" }}>
                          <>
                            <button
                              onClick={() => {
                                EditStatusToken(
                                  token.external_id,
                                  !token.habilitado
                                );
                              }}
                              className={`btn ${
                                token.habilitado
                                  ? "btn-outline-danger"
                                  : "btn-outline-success"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`bi ${
                                  token.habilitado
                                    ? "bi-stop-circle-fill"
                                    : "bi bi-power"
                                }`}
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5z" />
                              </svg>{" "}
                              {token.habilitado ? "Deshabilitar" : "Habilitar"}
                            </button>
                          </>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-6" style={{ paddingLeft: "20px" }}>
              <div className="row">
                <h3
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontFamily: "Arial",
                    fontWeight: "600",
                    borderBottom: "3px solid #e20613",
                  }}
                >
                  Solicitudes de API
                </h3>
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
                    <th>USUARIO</th>
                    <th>API STATUS</th>
                    <th>VER SOLICITUD</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((user) => (
                    <tr
                      key={user.external_id}
                      style={{
                        borderBottom: "1px solid white",
                        borderRight: "1px solid white",
                        background:
                          user.cuenta.estado === "ACEPTADO"
                            ? "#71b37147"
                            : user.cuenta.estado === "EN ESPERA"
                            ? "#b0b37147"
                            : user.cuenta.estado === "RECHAZADO"
                            ? "#b3717147"
                            : "transparent",
                      }}
                    >
                      <td style={{ padding: "5px" }}>{user.cuenta.correo}</td>
                      <td
                        style={{
                          padding: "5px",
                        }}
                      >
                        {user.cuenta.estado}{" "}
                      </td>
                      <td>
                        <a
                          onClick={() => {
                            mostrarArchivo(user.cuenta.description_pdf);
                          }}
                        >
                          {user.cuenta.description}
                        </a>
                      </td>
                      <td style={{ padding: "5px" }}>
                        <button
                          onClick={() => {
                            setCuentaSeleccionada(user);
                            setShowAsignarToken(true);
                          }}
                          className="btn btn-outline-info"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-key"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>{" "}
                          Asignar Token
                        </button>
                        <button
                          onClick={() => {
                            RechazarSolicitudUsuario(user.external_id);
                          }}
                          className="btn btn-outline-danger"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-fill-x"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                          </svg>
                          Rechazar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Modal
        show={showAsignarToken}
        onHide={() => setShowAsignarToken(false)}
        style={{ "--bs-modal-width": "40%" }}
        keyboard={false}
      >
        <AsignarToken
          usuario={cuentaSeleccionada}
          tokens={tokens}
          setShow={setShowAsignarToken}
        />
      </Modal>
      <Modal
        show={showRegistrarToken}
        onHide={() => showRegistrarToken(false)}
        style={{ "--bs-modal-width": "40%", transform: "translateY(20%)" }}
        keyboard={false}
      >
        <RegistrarToken setShow={setShowRegistrarToken} />
      </Modal>
    </>
  );
};

export default Solicitudes;
