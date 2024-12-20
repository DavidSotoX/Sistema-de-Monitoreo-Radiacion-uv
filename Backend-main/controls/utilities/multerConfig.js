const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

// Define una función para generar nombres de archivo únicos
const generarNombreArchivo = (file) => {
  const partes = file.originalname.split(".");
  const extension = partes[partes.length - 1];
  return `${uuid.v4()}.${extension}`;
};

// Define una función para validar las extensiones de archivo permitidas
const validarExtensionArchivo = (file, cb, extensiones) => {
  const allowedExtensions = extensiones || [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname);
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF, DOC, DOCX."));
  }
};

// Agrega una función para validar el tamaño máximo del archivo (2MB)
const validarTamanioMaximoArchivo = (file, cb) => {
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size <= maxSize) {
    cb(null, true);
  } else {
    cb(new Error("El tamaño del archivo excede el límite de 2MB."));
  }
};

// Función de configuración de multer genérica
const configuracionMulter = (carpetaDestino) => {
  return {
    storage: multer.diskStorage({
      destination: path.join(__dirname, `../../public/docs/${carpetaDestino}`),
      filename: (req, file, cb) => {
        cb(null, generarNombreArchivo(file));
      },
    }),
  };
};

// Crear el middleware de carga de imágenes genérico
const crearMiddlewareCarga = (carpetaDestino) => {
  const configuracion = configuracionMulter(carpetaDestino);
  return multer(configuracion);
};

module.exports = {
  crearMiddlewareCarga,
};
