import React, { useEffect, useState } from "react";
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

const RegistrarToken = (props) => {
  const { setShow } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const datos = {
      habilitado: data.habilitado,
    };
    POST(datos, `guardar/peticion_token`, getToken())
      .then((info) => {
        if (info.code !== 200) {
          mensajes("Hubo un error en el registro", "error", "Error");
        } else {
          mensajes("Token asignado exitosamente", "success", "Éxito");
          setShow(false);
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      })
      .catch((error) => {
        console.error(error);
        mensajes("Hubo un error en el registro", "error", "Error");
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
                Crear un nuevo token?
              </h5>

              <div className="row">
                <Form.Group className="mb-4">
                  <Form.Label>Habilitar Token</Form.Label>
                  <Form.Select
                    {...register("habilitado", { required: true })}
                    isInvalid={!!errors.habilitado}
                  >
                    <option value={true}>Sí</option>
                    <option value={false}>No</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.habilitado?.type === "required" &&
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
                    Registrar{" "}
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

export default RegistrarToken;
