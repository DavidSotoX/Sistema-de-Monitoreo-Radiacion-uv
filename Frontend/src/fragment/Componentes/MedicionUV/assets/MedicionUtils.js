import colorValues from "../../../../utilidades/data/colorValues.json";

// Definir el buffer con una longitud máxima de 50
const bufferLength = 50;
let uvBuffer = [];

export const agregarValorAlBuffer = (nuevoValor) => {
  uvBuffer.push(nuevoValor);
  
  // Mantener el buffer con una longitud máxima de 50
  if (uvBuffer.length > bufferLength) {
    uvBuffer.shift(); // Eliminar el valor más antiguo
  }
};

export const getCategoriaPorUV = (uvValue) => {
  uvValue = parseInt(uvValue);
  if (uvValue > 11) {
    uvValue = 11;
  }
  const categoriaEncontrada = colorValues.find((categoria) => {
    const rango = categoria.valor_max.split("-");
    const min = parseFloat(rango[0]);
    const max = parseFloat(rango[1]);
    return uvValue >= min && uvValue <= max;
  });

  return categoriaEncontrada;
};

export function formatearFechaYHora(fecha) {
  let fechaFormateada, horaFormateada;
  if (!fecha) {
    var fechaHora = new Date();
    const dia = fechaHora.getDate();
    const mes = fechaHora.getMonth() + 1; // Los meses van de 0 a 11
    const año = fechaHora.getFullYear();

    const horas = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();
    const segundos = fechaHora.getSeconds();

    fechaFormateada = `${dia}/${mes}/${año}`;
    horaFormateada = `${horas}:${minutos}:${segundos}`;
  } else {
    const partes = fecha.split("T")[0].split("-");
    const dia = partes[2];
    const mes = partes[1];
    const año = partes[0];

    fechaFormateada = `${dia}/${mes}/${año}`;

    const horaPartes = fecha.split("T")[1].split(".")[0].split(":");
    const horas = horaPartes[0].padStart(2, "0");
    const minutos = horaPartes[1].padStart(2, "0");
    const segundos = horaPartes[2].padStart(2, "0");

    horaFormateada = `${horas}:${minutos}:${segundos}`;
  }

  return `${fechaFormateada} ${horaFormateada}`;
}
