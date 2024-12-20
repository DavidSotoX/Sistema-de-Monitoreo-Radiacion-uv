import jsPDF from 'jspdf';
import logoUnlPNG from '../../utilidades/imagenes/logounl.png';
import locoComputacion from '../../utilidades/imagenes/logoComputacion.png';
import 'jspdf-autotable';

const generatePdf = (dispositivos, promedio) => {
  const doc = new jsPDF();
  let y = 20;

 
  doc.addImage(logoUnlPNG, 'PNG', 2.5, 2.5, 50, 20); // ( imagen, tipo, x, y, ancho, alto)
  doc.addImage(locoComputacion, 'PNG', 175, 2.5, 30, 20); 
  const titulo = 'Reporte de Ultima medición de Dispositivos Sensores de Radiación UV';


  const lines = doc.splitTextToSize(titulo, doc.internal.pageSize.getWidth() - 20); 

  
  lines.forEach((line) => {
    doc.text(line, 10, y+20);
    y += 10; 
  });
 
  
  const tableData = dispositivos.map((dispositivo) => {
    const fecha = new Date(dispositivo.medicion[0].fecha);
    const fechaFormateada = fecha.toLocaleDateString(); 
    const hora = fecha.toLocaleTimeString(); 
    return [dispositivo.nombre, dispositivo.medicion[0].uv, fechaFormateada, hora]; 
  });

  tableData.push(['Promedio', promedio]);
  doc.autoTable({
    startY: y + 20, 
    head: [['Nombre Sensor', 'Medición UV', 'Fecha', 'Hora']],
    body: tableData,
  });

  
  doc.save('reporte_dispositivos_uv.pdf');
};

export default generatePdf;
