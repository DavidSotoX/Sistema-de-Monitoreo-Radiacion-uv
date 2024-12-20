import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { POST } from "../../../../../hooks/Conexion";
import mensajes from "../../../../../utilidades/Mensajes";
import { saveToken } from "../../../../../utilidades/Sessionutil";

import iniciar_sesion from "../../imgs/iniciar_sesion.jpg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import FloatingLabel from "react-bootstrap/FloatingLabel";
const IniciarSesion = (props) => {
  const { setShow, setShowRegistrarse } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegation = useNavigate();

  const onSubmit = (data) => {
    var datos = {
      correo: data.correo,
      clave: data.clave,
    };

    POST(datos, "iniciar_sesion").then((info) => {
      if (info.code !== 200) {
        mensajes("Correo y/o Contraseña Incorrectos", "error", "Error");
      } else {
        data = {
          user: info.info.user,
        };
        setShow((prev) => !prev);
        saveToken(info.info.token);
        localStorage.setItem("data", JSON.stringify(data));
        if (info.info.user.rol === "ADMINISTRADOR") {
          navegation("/admin");
        } else {
          navegation("/inicio");
        }
      }
    });
  };
  return (
    <MDBCard style={{ border: "none" }}>
      <MDBRow className="g-0">
        <MDBCol md="6">
          <MDBCardImage
            src={iniciar_sesion}
            style={{ width: "100%", height: "100%" }}
            alt="login form"
          />
        </MDBCol>
        <MDBCol md="6">
          <MDBCardBody className="col">
            <div className="container" style={{ padding: "30px 10px" }}>
              <label
                style={{
                  color: "#212529",
                  fontSize: "30px",
                  fontWeight: "bold",
                  fontFamily: "Arial",
                }}
              >
                <img
                  className="img-fluid"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"
                  }
                  alt="UNL_LOGO"
                  style={{
                    width: "30%",
                    marginRight: "2px",
                  }}
                />
                SEMAFORO UV
              </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-sample">
              <Button
                variant="danger"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "white",
                  fontSize: "20px",
                }}
                onClick={() => setShow(false)}
              >
                <span aria-hidden="true">&times;</span>
              </Button>
              <h5
                className="col-sm-12 text-center mt-5 mb-5"
                style={{ letterSpacing: "1px" }}
              >
                Ingresa a tu cuenta
              </h5>

              <div className="row">
                <FloatingLabel label="Correo Electrónico" className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Correo Electrónico"
                    required
                    {...register("correo", { required: true })}
                  />
                  {errors.correo && errors.correo.type === "required" && (
                    <Form.Control.Feedback type="invalid">
                      Ingresa bien el correo
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <FloatingLabel label="Contraseña">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    {...register("clave", { required: true })}
                  />
                </FloatingLabel>
              </div>
              <div className="row">
                <div className="text-center mt-5 mb-2">
                  <Button
                    size="lg"
                    variant="dark"
                    type="submit"
                    style={{ width: "150px" }}
                  >
                    Ingresar
                  </Button>
                </div>
                <div className="text-center mt-5 mb-2">
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Quieres ser un Usuario?{" "}
                    <a
                      onClick={() => {
                        setShow((prev) => !prev);
                        setShowRegistrarse((prev) => !prev);
                      }}
                      style={{
                        textDecoration: "underline",
                        textDecorationColor: "transparent",
                        cursor: "pointer",
                        color: "#000",
                        transition: "color 0.3s, borderBottom 0.3s",
                        display: "inline-block",
                        marginBottom: "-1px",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#007bff";
                        e.target.style.textDecorationColor = "#007bff";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#000";
                        e.target.style.textDecorationColor = "transparent";
                      }}
                    >
                      Registrate aquí
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
};

export default IniciarSesion;
