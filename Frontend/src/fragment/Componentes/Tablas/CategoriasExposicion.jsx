import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import React from "react";
import colorValues from "../../../utilidades/data/colorValues.json";
const CategoriasExposicion = () => {
  return (
    <div
      className="card"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "rgba(19, 35, 64, 0.7)",
      }}
    >
      <div className="card-header">
        <h4
          className="card-title text-center"
          style={{ fontWeight: "bold", color: "white" }}
        >
          Categorías de exposición
        </h4>
      </div>
      <div className="card-body">
        <div className="container" style={{ borderRadius: "10px" }}>
          <Table className="table-striped table-hover">
            <thead>
              <tr className="text-center">
                <th>Categoría</th>
                <th>Rango</th>
                <th>Colores</th>
              </tr>
            </thead>
            <tbody>
              {colorValues.map((categoria, index) => (
                <tr key={index}>
                  <td>{categoria.tipo}</td>
                  <td>{categoria.valor_max}</td>
                  <td style={{ backgroundColor: categoria.color }}></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default CategoriasExposicion;
