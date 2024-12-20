import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { POST } from "../../../../../hooks/Conexion";
import { Button, Form } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import mensajes from "../../../../../utilidades/Mensajes";
import { getToken } from "../../../../../utilidades/Sessionutil";
import img from "./img/img.jpg";

const RegistrarUsuario = (props) => {
  const { setShow } = props;

  const [paginaActual, setPagina] = useState(1);
  const [show_Institucion, setShow_Institucion] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    if (paginaActual === 1) {
      setPagina(2);
    } else {
      const datos = {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: data.fecha_nacimiento,
        cargo: data.cargo,
        institucion: data.institucion,
        correo: data.correo,
        clave: data.clave,
        rol: data.rol,
      };

      POST(datos, "guardar/persona", getToken())
        .then((info) => {
          if (info.code !== 200) {
            mensajes("Hubo un error en el registro", "error", "Error");
          } else {
            mensajes("Usuario registrado exitosamente", "success", "Éxito");
            setShow(false);
            setTimeout(() => {
              window.location.reload();
            }, 10);
          }
        })
        .catch(() => {
          mensajes("Hubo un error en el registro", "error", "Error");
        });
    }
  };

  const handleCancelar = () => {
    if (paginaActual === 1) {
      setShow(false);
    } else {
      setPagina((prev) => prev - 1);
    }
  };

  return (
    <MDBCard style={{ border: "none" }}>
      <MDBRow className="g-0">
        <MDBCol md="6">
          <MDBCardImage
            src={img}
            style={{ width: "100%", height: "100%" }}
            alt="login form"
          />
        </MDBCol>

        <MDBCol md="6">
          <MDBCardBody className="col">
            <div className="container" style={{ padding: "30px 10px" }}>
              <img
                className="img-fluid"
                src="https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"
                alt="UNL_LOGO"
                style={{
                  width: "70%",
                  marginRight: "2px",
                  paddingLeft: "90px",
                }}
              />
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
              <h3
                className="text-center"
                style={{ letterSpacing: "1px", paddingBottom: "10px" }}
              >
                Registrar Usuario
              </h3>
              <h5
                className="col-sm-12 text-center"
                style={{ letterSpacing: "1px" }}
              >
                {paginaActual === 1
                  ? "Datos Personales"
                  : "Datos Institucionales"}
              </h5>

              <div className="row">
                {paginaActual === 1 && (
                  <>
                    <Form.Group className="mb-4">
                      <Form.Label>Nombres</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombres"
                        {...register("nombres", { required: true })}
                        isInvalid={!!errors.nombres}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombres?.type === "required" &&
                          "Ingresa los nombres"}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Apellidos"
                        {...register("apellidos", { required: true })}
                        isInvalid={!!errors.apellidos}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellidos?.type === "required" &&
                          "Ingresa los apellidos"}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        {...register("fecha_nacimiento", { required: true })}
                        isInvalid={!!errors.fecha_nacimiento}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fecha_nacimiento?.type === "required" &&
                          "Ingresa la fecha de nacimiento"}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Rol del Usuario</Form.Label>
                      <Form.Select
                        {...register("rol", { required: true })}
                        isInvalid={!!errors.rol}
                      >
                        <option value="">Seleccione un rol</option>
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                        <option value="USUARIO">USUARIO</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.rol?.type === "required" && "Seleccione un rol"}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                {paginaActual === 2 && (
                  <>
                    <Form.Group className="mb-4">
                      <Form.Label>Institución</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Institución"
                        disabled={show_Institucion}
                        {...register("institucion", {
                          required: !show_Institucion,
                        })}
                        isInvalid={!!errors.institucion}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.institucion?.type === "required" &&
                          "Ingresa la institución"}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Cargo</Form.Label>
                      <Form.Select
                        {...register("cargo", { required: true })}
                        isInvalid={!!errors.cargo}
                      >
                        <option value="" disabled>
                          Seleccione un cargo
                        </option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Profesor">Profesor</option>
                        <option value="Director">Director</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Externo">Externo</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.cargo?.type === "required" &&
                          "Seleccione un cargo"}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Correo Electrónico"
                        {...register("correo", { required: true })}
                        onChange={(e) => {
                          const correo = e.target.value;
                          const dominio = correo.split("@")[1];
                          switch (dominio) {
                            case "unl.edu.ec":
                              setValue(
                                "institucion",
                                "Universidad Nacional de Loja"
                              );
                              setShow_Institucion(true);
                              break;
                            case "utpl.edu.ec":
                              setValue(
                                "institucion",
                                "Universidad Técnica Particular de Loja"
                              );
                              setShow_Institucion(true);
                              break;
                            case "uide.edu.ec":
                              setValue(
                                "institucion",
                                "Universidad Internacional del Ecuador"
                              );
                              setShow_Institucion(true);
                              break;
                            default:
                              setShow_Institucion(false);
                          }
                        }}
                        isInvalid={!!errors.correo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.correo?.type === "required" &&
                          "Ingresa un correo electrónico"}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          {...register("clave", {
                            required: true,
                          })}
                          isInvalid={!!errors.clave}
                        />
                        <Button
                          variant="light"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-eye-slash-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-eye-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                            </svg>
                          )}
                        </Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {errors.clave?.type === "pattern" &&
                          errors.clave.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                <div className="text-center mt-5 mb-2">
                  {paginaActual === 2 && (
                    <Button
                      size="lg"
                      variant="dark"
                      style={{ width: "120px" }}
                      onClick={handleCancelar}
                      disabled={isSubmitting}
                    >
                      Atrás
                    </Button>
                  )}{" "}
                  <Button
                    size="lg"
                    variant="dark"
                    type="submit"
                    style={{ width: "150px" }}
                    disabled={isSubmitting}
                  >
                    {paginaActual === 1 ? "Siguiente" : "Registrar"}
                  </Button>
                </div>
              </div>
            </form>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
};

export default RegistrarUsuario;
