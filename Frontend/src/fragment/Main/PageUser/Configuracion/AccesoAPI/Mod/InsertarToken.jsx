import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { POST } from "../../../../../../hooks/Conexion";
import { getToken } from "../../../../../../utilidades/Sessionutil";
import mensajes from "../../../../../../utilidades/Mensajes";

const InsertarToken = (props) => {
  const { usuario, setShow } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    if (usuario.token != "token no asignado") {
      setValue("token_insertado", usuario.token);
    }
  }, [setValue]);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const datos = {
      "api-key": data.token_insertado,
    };

    POST(datos, "redirigir/api", getToken()).then((info) => {
      if (info.code != 200) {
        mensajes(info.msg, "error", "Error de Acceso");
      } else {
        mensajes(info.msg, "success", "Exito");
        setShow(false);
        window.open("http://localhost:8000/", "_blank");
      }
    });
  };

  return (
    <MDBCard style={{ border: "none" }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="9">
          <MDBCardBody className="col">
            <form onSubmit={handleSubmit(onSubmit)} className="form-sample">
              <h5
                className="col-sm-12 text-center mt-5 mb-5"
                style={{ letterSpacing: "1px" }}
              >
                Acceso a la Api
              </h5>

              <div className="row">
                <Form.Group className="mb-4">
                  <Form.Label>API Token Asignado</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Insertar el Token"
                      {...register("token_insertado", {
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
                    {errors.token_insertado?.type === "required" &&
                      "Seleccione si desea habilitar el token"}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="text-center mt-5 mb-2">
                  <Button
                    size="lg"
                    variant="dark"
                    type="submit"
                    style={{ width: "150px" }}
                    disabled={isSubmitting}
                  >
                    Acceder{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-key-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </Button>{" "}
                  <Button
                    size="lg"
                    variant="danger"
                    style={{ width: "150px" }}
                    onClick={() => setShow(false)}
                  >
                    Cancelar{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
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

export default InsertarToken;
