import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
const Recomendaciones = () => {
  const indices = ["0-2", "3-5", "5-7", "8-10", "11+"];
  const description = [
    "Puede permanecer en el exterior sin riesgos.",
    "Pongase camisa, crema de proteccion solar, sombrero y gafas de sol",
    "Manténgase a la sombra durante las horas centrales del día.",
    "Es imprescindible usar camisa, crema de protección solar, sombrero y gafas de sol",
    "Es imprescindible usar camisa, crema de protección solar, sombrero y gafas de sol",
  ];
  return (
    <div
      className="card text-center"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "rgba(19, 35, 64, 0.7)",
      }}
    >
      <div className="card-header">
        <h3
          className="card-title text-center"
          style={{ fontWeight: "bold", color: "white" }}
        >
          Recomendaciones
        </h3>
      </div>
      <div className="card-body">
        <div />
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Indice</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {indices.map((indice, index) => (
              <tr key={index}>
                <td>{indice}</td>
                <td>{description[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Recomendaciones;
