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

const AsignarToken = (props) => {
  const { usuario, tokens, setShow } = props;
  const [tokenSeleccionado, setTokenSeleccionado] = useState("");
  const [nro_peticiones, setNro_peticiones] = useState(0);

  useEffect(() => {
    if (tokenSeleccionado) {
      const tokenInfo = tokens.find(
        (token) => token.external_id === tokenSeleccionado
      );
      if (tokenInfo) {
        setNro_peticiones(tokenInfo.nro_peticiones);
      }
    }
  }, [tokenSeleccionado, tokens]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const datos = {
      external_token: tokenSeleccionado,
      external_cuenta: usuario.cuenta.external_id,
      nro_peticiones: nro_peticiones + 1,
    };
    POST(datos, `guardar/peticion_token/${datos.external_token}`, getToken())
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
            <form onSubmit={handleSubmit(onSubmit)} className="form-sample">
              <h5
                className="col-sm-12 text-center mt-5 mb-5"
                style={{ letterSpacing: "1px" }}
              >
                Asignar Llave del API
              </h5>

              <div className="row">
                <Form.Group className="mb-4">
                  <Form.Label>Nombres y Apellidos del Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombres y Apellidos"
                    defaultValue={`${usuario.nombres} ${usuario.apellidos}`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Institución</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Institución"
                    defaultValue={usuario.institucion}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cargo"
                    defaultValue={usuario.cargo}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo Electrónico"
                    defaultValue={usuario.cuenta.correo}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Seleccionar una llave de acceso</Form.Label>
                  <Form.Select
                    {...register("token", { required: true })}
                    isInvalid={!!errors.token}
                    onChange={(e) => setTokenSeleccionado(e.target.value)}
                  >
                    <option value="">- - - Seleccione - - -</option>
                    {tokens
                      .filter((token) => token.habilitado)
                      .map((token) => (
                        <option
                          key={token.external_id}
                          value={token.external_id}
                        >
                          {token.external_id}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.token?.type === "required" && "Seleccione un token"}
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
                    Asignar Token{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-repeat"
                      viewBox="0 0 16 16"
                    >
                      {/* ... Path for the 'arrow-repeat' icon ... */}
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
                      {/* ... Path for the 'x-circle' icon ... */}
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

export default AsignarToken;
