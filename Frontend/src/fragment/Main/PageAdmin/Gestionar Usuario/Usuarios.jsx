import React, { useEffect, useState } from "react";
import { DELETE, GET } from "../../../../hooks/Conexion";
import { getToken } from "../../../../utilidades/Sessionutil";
import { Modal, Spinner } from "react-bootstrap";
import RegistrarUsuario from "./Mod/RegistrarUsuario";
import EditarUsuario from "./Mod/EditarUsuario";
import mensajes from "../../../../utilidades/Mensajes";
import swal from "sweetalert";
const Usuarios = (props) => {
  const [llUsuarios, setLlUsuarios] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [terminoBuscado, setTerminoBuscado] = useState("");
  const [buscarRol, setBuscarRol] = useState("");

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [showRegistrarUsuario, setShowRegistrarUsuario] = useState(false);
  const [showEditarUsuario, setShowEditarUsuario] = useState(false);
  useEffect(() => {
    if (!llUsuarios) {
      GET("listar/persona", getToken())
        .then((info) => {
          if (info.code !== 200) {
            console.error("Error en la respuesta:", info);
          } else {
            setUsuarios(info.info);
            const usuariosAceptados = info.info.filter(
              (user) => user.cuenta.estado === "ACEPTADO"
            );
            //setUsuarios(usuariosAceptados);
          }
        })
        .catch((error) => {
          setError("Error de Conexión");
        })
        .finally(() => {
          setLlUsuarios(true);
          setLoading(false);
        });
    }
  }, [llUsuarios, setLoading]);

  const Buscar_Usuario = (e) => {
    setTerminoBuscado(e.target.value);
  };

  const Buscar_Usuario_Rol = (e) => {
    setBuscarRol(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter((user) => {
    const usuarioBuscado =
      user.nombres.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      user.institucion.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      user.cargo.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      user.cuenta.correo.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      user.cuenta.rol.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
      user.cuenta.estado.toLowerCase().includes(terminoBuscado.toLowerCase());
    if (buscarRol != "Seleccionar") {
      return (
        usuarioBuscado &&
        user.cuenta.rol.toLowerCase().includes(buscarRol.toLowerCase())
      );
    }

    return usuarioBuscado;
  });
  const mostrarMensajeEliminar = (usuario) => {
    new swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DELETE(`eliminar/persona/${usuario.external_id}`, getToken()).then(
          (respuesta) => {
            if (respuesta.code === 200) {
              mensajes("Usuario eliminado exitosamente", "success", "Éxito");
              setTimeout(() => {
                window.location.reload();
              }, 10);
            } else {
              mensajes(respuesta.msg, "error", "Error");
            }
          }
        );
      }
    });
  };
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
            Usuarios del Sistema
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
              Cargando usuarios...
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
          llUsuarios &&
          usuarios.length > 0 && (
            <div
              className="row"
              style={{
                scale: "1",
                padding: "50px",
                fontFamily: "Arial",
                fontWeight: "600",
                overflow: "auto",
              }}
            >
              <div
                className="col-6"
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
                  placeholder={"Buscar Usuario"}
                  onChange={Buscar_Usuario}
                ></input>
              </div>
              <div
                className="col-2"
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
                  onChange={Buscar_Usuario_Rol}
                >
                  <option
                    value="Seleccionar"
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                  >
                    - - - -Seleccione- - - -
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="ADMINISTRADOR"
                  >
                    ADMINISTRADOR
                  </option>
                  <option
                    style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    value="USUARIO"
                  >
                    USUARIO
                  </option>
                </select>
              </div>
              <div
                className="col-4 "
                style={{
                  paddingLeft: "10px",
                  paddingBottom: "20px",
                }}
              >
                <button
                  className="btn btn-outline-info"
                  style={{
                    borderRadius: "5px",
                    width: "50%",
                    height: "100%",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onClick={() => setShowRegistrarUsuario(true)}
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
                  Registrar Usuario
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
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>INSTITUCIÓN</th>
                    <th>CARGO</th>
                    <th>CORREO ELECTRÓNICO</th>
                    <th>ROL</th>
                    <th>API STATUS</th>
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
                      <td style={{ padding: "5px" }}>{user.nombres}</td>
                      <td style={{ padding: "5px" }}>{user.apellidos}</td>
                      <td style={{ padding: "5px" }}> {user.institucion}</td>
                      <td style={{ padding: "5px" }}>{user.cargo}</td>
                      <td style={{ padding: "5px" }}>{user.cuenta.correo}</td>
                      <td style={{ padding: "5px" }}>{user.cuenta.rol}</td>

                      <td
                        style={{
                          padding: "5px",
                        }}
                      >
                        {user.cuenta.estado}{" "}
                      </td>
                      <td style={{ padding: "5px" }}>
                        <button
                          onClick={() => {
                            setUsuarioSeleccionado(user);
                            setShowEditarUsuario(true);
                          }}
                          className="btn btn-outline-info"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-vcard-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                          </svg>{" "}
                          Editar
                        </button>
                        <button
                          onClick={() => mostrarMensajeEliminar(user)}
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
                          Borrar
                        </button>
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
        show={showRegistrarUsuario}
        onHide={() => setShowRegistrarUsuario(false)}
        style={{ "--bs-modal-width": "40%" }}
        keyboard={false}
      >
        <RegistrarUsuario setShow={setShowRegistrarUsuario} />
      </Modal>
      <Modal
        show={showEditarUsuario}
        onHide={() => setShowEditarUsuario(false)}
        style={{ "--bs-modal-width": "40%" }}
        keyboard={false}
      >
        <EditarUsuario
          setShow={setShowEditarUsuario}
          usuario={usuarioSeleccionado}
        />
      </Modal>
    </>
  );
};

export default Usuarios;
