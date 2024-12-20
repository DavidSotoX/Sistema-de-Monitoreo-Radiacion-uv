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

const EditarDispositivo = (props) => {
  const { setShow, dispositivo } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm();

  const estadoCheckbox = watch("estado");
  useEffect(() => {
    setValue("identificador", dispositivo.identificador);
    setValue("latitud", dispositivo.latitud);
    setValue("longitud", dispositivo.longitud);
    setValue("estado", dispositivo.estado);
  }, [dispositivo, setValue]);

  const onSubmit = (data) => {
    const datos = {
      identificador: parseInt(data.identificador),
      latitud: parseFloat(data.latitud),
      longitud: parseFloat(data.longitud),
      estado: data.estado || false,
    };

    POST(datos, `guardar/dispositivo/${dispositivo.external_id}`, getToken())
      .then((info) => {
        if (info.code !== 200) {
          mensajes("Hubo un error en el registro", "error", "Error");
        } else {
          mensajes("Dispositivo editado exitosamente", "success", "Éxito");
          setShow(false);
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      })
      .catch(() => {
        mensajes("Hubo un error en el registro", "error", "Error");
      });
  };

  const handleCancelar = () => {
    setShow(false);
  };

  return (
    <MDBCard style={{ border: "none" }}>
      <MDBRow className="g-0">
        <MDBCol md="6">
          <MDBCardImage
            src="https://preview.redd.it/10x4x7psctv61.jpg?width=2048&format=pjpg&auto=webp&s=ce757dd8d2ac5c02f8b44204f312e066ca4f5d20"
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
              <h5
                className="col-sm-12 text-center mt-5 mb-5"
                style={{ letterSpacing: "1px" }}
              >
                Datos del Dispositivo
              </h5>

              <div className="row">
                <Form.Group className="mb-4">
                  <Form.Label>Identificador</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Identificador"
                    {...register("identificador", { required: true })}
                    isInvalid={!!errors.identificador}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.identificador?.type === "required" &&
                      "Ingresa el identificador"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Latitud</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    placeholder="Latitud"
                    {...register("latitud", { required: true })}
                    isInvalid={!!errors.latitud}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.latitud?.type === "required" &&
                      "Ingresa la latitud"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Longitud</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    placeholder="Longitud"
                    {...register("longitud", { required: true })}
                    isInvalid={!!errors.longitud}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.longitud?.type === "required" &&
                      "Ingresa la longitud"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={`Estado: ${estadoCheckbox ? "Activo" : "Inactivo"}`}
                    {...register("estado")}
                    onChange={() => {
                      setValue("estado", !estadoCheckbox);
                    }}
                  />
                </Form.Group>

                <div className="text-center mt-5 mb-2">
                  <Button
                    size="lg"
                    variant="dark"
                    type="submit"
                    style={{ width: "150px" }}
                    disabled={isSubmitting}
                  >
                    Editar{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-plus"
                      viewBox="0 0 231 231"
                    >
                      <path
                        fill="white"
                        d="m73.31 101.042 26.702.035a1.03 1.03 0 0 1 1.029 1.018l.072 12.364a1.019 1.019 0 0 1-.297.735c-.096.097-.21.174-.335.227a1.041 1.041 0 0 1-.397.079l-70.186-.036a1.029 1.029 0 0 1-1.03-1.029l.073-12.496a1.03 1.03 0 0 1 1.029-1.029l26.81.144a1.02 1.02 0 0 0 .732-.306 1.034 1.034 0 0 0 .298-.736l-.12-12.388a1.029 1.029 0 0 0-1.03-1.017l-41.113.156a1.03 1.03 0 0 1-1.029-1.03l.024-70.102a1.028 1.028 0 0 1 1.03-1.029l98.898-.012a1.026 1.026 0 0 1 .951.636c.052.124.079.258.079.393l-.012 70.043a1.025 1.025 0 0 1-.302.727 1.022 1.022 0 0 1-.728.302l-41.197-.072a1.03 1.03 0 0 0-1.04 1.041l.059 12.352a1.03 1.03 0 0 0 1.03 1.03Zm27.707-71.287a.803.803 0 0 0-.802-.802H29.671a.802.802 0 0 0-.802.802v41.7a.802.802 0 0 0 .802.801h70.544a.805.805 0 0 0 .802-.802v-41.7Zm115.465 172.699a13.957 13.957 0 0 1-13.956 13.956h-58.624a13.957 13.957 0 0 1-13.956-13.956V100.718a13.948 13.948 0 0 1 8.615-12.893 13.958 13.958 0 0 1 5.341-1.062h58.624a13.953 13.953 0 0 1 12.893 8.615 13.943 13.943 0 0 1 1.063 5.34v101.736Zm-14.423-100.455a1.008 1.008 0 0 0-1.005-1.005h-55.776a1.005 1.005 0 0 0-1.005 1.005v99.222c0 .267.106.523.295.711.188.189.444.295.71.295h55.776a1.006 1.006 0 0 0 1.005-1.006v-99.222Zm-137.092 42.25a7.097 7.097 0 1 0 0-14.195 7.098 7.098 0 0 0 0 14.195Zm.013 21.664a7.11 7.11 0 1 0 0-14.219 7.11 7.11 0 0 0 0 14.219Zm21.639 21.676a7.11 7.11 0 1 0 0-14.22 7.11 7.11 0 0 0 0 14.22Zm-21.639-.012a7.098 7.098 0 1 0-.001-14.196 7.098 7.098 0 0 0 0 14.196Zm43.279.024a7.11 7.11 0 1 0 0-14.219 7.11 7.11 0 0 0 0 14.219Z"
                      />
                      <path
                        fill="white"
                        d="m179.535 180.465-12.495-.043a.921.921 0 0 0-.925.918l-.044 12.711a.921.921 0 0 0 .918.925l12.495.043a.921.921 0 0 0 .925-.918l.045-12.711a.923.923 0 0 0-.919-.925Z"
                      />
                    </svg>
                  </Button>{" "}
                  <Button
                    size="lg"
                    variant="danger"
                    onClick={handleCancelar}
                    style={{ width: "150px" }}
                    disabled={isSubmitting}
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

export default EditarDispositivo;
