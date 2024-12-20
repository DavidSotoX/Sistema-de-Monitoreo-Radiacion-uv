import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Spinner } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import mensajes from "../../../../../utilidades/Mensajes";
import { POST } from "../../../../../hooks/Conexion";
import { getToken } from "../../../../../utilidades/Sessionutil";
const Registrarse = (props) => {
  const { setShow } = props;
  const [paginaActual, setPagina] = useState(1);
  const [show_Institucion, setShow_Institucion] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
        rol: "USUARIO",
        description: data.description,
        description_pdf: data.description_pdf[0],
      };
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const ext = datos.description_pdf.name.split(".")[1];
      if (!allowedExtensions.includes(`.${ext}`)) {
        mensajes(
          "El archivo debe ser de tipo .pdf, .doc o .docx",
          "error",
          "Error"
        );
        return;
      }
      POST(datos, "registrarse", getToken(), "form")
        .then((info) => {
          console.log(info);
          if (info.code !== 200) {
            mensajes(info.msg, "error", "Error");
            setLoading(true);
          } else {
            console.log(info);
            mensajes(
              "Te has registrado, ahora puedes iniciar sesión",
              "success",
              "Éxito"
            );
            setShow(false);
            setLoading(false);
          }
        })
        .catch(() => {
          mensajes("Hubo un error en el registro", "error", "Error");
        })
        .finally(() => {
          setLoading(false);
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
  const validarFecha = (value) => {
    const fecha = new Date(value);
    const hoy = new Date();
    if (fecha > hoy) {
      return false;
    }
    return true;
  };
  return (
    <MDBCard style={{ border: "none" }}>
      <MDBRow className="g-0">
        <MDBCol md="6">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-sample"
              encType="multipart/form-data"
            >
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
                Registrarse
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
                        {...register("fecha_nacimiento", {
                          required: true,
                          validate: validarFecha,
                        })}
                        isInvalid={!!errors.fecha_nacimiento}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fecha_nacimiento?.type === "required" &&
                          "Ingresa la fecha de nacimiento"}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Descripción de la solicitud</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          as={"textarea"}
                          placeholder="Describa un poco por qué desea registrarse"
                          {...register("description", {
                            required: true,
                          })}
                          isInvalid={!!errors.description}
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {errors.description?.type === "required" &&
                          "Ingrasa una breve descripción"}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <div className="form-data">
                        <label>
                          {
                            "Ingrese la solicitud (extensiones aceptadas: .pdf .docx .doc)"
                          }
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          {...register("description_pdf")}
                        />
                      </div>
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
                        onChange={(e) => {
                          setValue("institucion", e.target.value);
                        }}
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
                              break;
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
                  {loading ? ( // Display loading message if 'loading' state is true
                    <Spinner animation="border" role="status" variant="info">
                      <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </form>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
};

export default Registrarse;
