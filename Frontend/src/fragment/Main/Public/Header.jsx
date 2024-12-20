import "./imgs/styleHeader.css";
import UNL_LOGO from "./imgs/UNL_LOGO.png";
import React, { useState } from "react";
import { Container, Dropdown, Modal, NavDropdown } from "react-bootstrap";
import IniciarSesion from "./Mod/Iniciar Sesion/IniciarSesion";
import { borrarSesion, estaSesion } from "../../../utilidades/Sessionutil";
import { useNavigate } from "react-router";
import Registrarse from "./Mod/Registrarse/Registrarse";
const Header = (props) => {
  const navegation = useNavigate();
  const [show, setShow] = useState(false);
  const [showRegistrarse, setShowRegistrarse] = useState(false);
  const [user, setUser] = useState(props.user);
  return (
    <>
      <nav className="nav" style={{ zIndex: 2 }}>
        <div className="container">
          <div className="logo">
            <a href="https://unl.edu.ec/oferta_academica/facultad-de-la-energia-las-industrias-y-los-recursos-naturales-no-renovables">
              <img
                className="img-fluid"
                src={UNL_LOGO}
                alt="UNL_LOGO"
                style={{
                  width: "50%",
                  marginRight: "10px",
                  maxWidth: "100%",
                }}
              />
            </a>
          </div>
          <div id="mainListDiv" className="main_list ">
            <ul className="navlinks">
              <li>
                {!estaSesion() ? (
                  <a onClick={() => setShow(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-person-fill-lock"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a1.9 1.9 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                    </svg>
                    
                    Iniciar Sesión
                  </a>
                ) : (
                  <>
                    <NavDropdown
                      className="nav-link"
                      title={
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="30"
                            fill="currentColor"
                            className="bi bi-person-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                          </svg>
                          {user.nombres.split(" ")[0] +
                            " " +
                            user.apellidos.split(" ")[0]}
                        </span>
                      }
                      menuVariant="dark"
                      style={{
                        opacity: 0.9,
                      }}
                    >
                      <Container style={{ scale: "0.8" }}>
                        <Dropdown.Item
                          onClick={() =>
                            props.isAdmin
                              ? navegation("/admin")
                              : navegation("/inicio")
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="40"
                            fill="currentColor"
                            className="bi bi-house-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                          </svg>{" "}
                          Inicio
                        </Dropdown.Item>
                        {props.isAdmin && (
                          <Dropdown.Item
                            onClick={() => navegation("/admin/gestion")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="40"
                              fill="currentColor"
                              className="bi bi-wrench-adjustable-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.496 8a4.5 4.5 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11q.04.3.04.61" />
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.5 4.5 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8m-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27z" />
                            </svg>{" "}
                            Gestionar
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item
                          onClick={() =>
                            props.isAdmin
                              ? navegation("/admin/configuracion")
                              : navegation("/inicio/configuracion")
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="40"
                            fill="currentColor"
                            className="bi bi-gear-wide-connected"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
                          </svg>{" "}
                          Configuración
                        </Dropdown.Item>
                        <Dropdown.Item href="/" onClick={() => borrarSesion()}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="40"
                            fill="currentColor"
                            className="bi bi-box-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                            />
                          </svg>{" "}
                          Cerrar Sesión
                        </Dropdown.Item>
                      </Container>
                    </NavDropdown>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ "--bs-modal-width": "40%", transform: "translateY(10%)" }}
        keyboard={false}
      >
        <IniciarSesion
          setShow={setShow}
          setShowRegistrarse={setShowRegistrarse}
        />
      </Modal>
      <Modal
        show={showRegistrarse}
        onHide={() => setShowRegistrarse(false)}
        style={{ "--bs-modal-width": "40%" }}
        keyboard={false}
      >
        <Registrarse setShow={setShowRegistrarse} />
      </Modal>
    </>
  );
};

export default Header;
