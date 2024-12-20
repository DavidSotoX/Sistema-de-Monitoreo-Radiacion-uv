var models = require("../models");
const medicion = models.medicion;
const dispositivo = models.dispositivo;
const { validationResult } = require("express-validator");
const uuid = require("uuid");

class MedicionController {
  async guardar(req, res) {
    const transaction = await models.sequelize.transaction({ timeout: 30000 });
    try {
      if (!req.params.external_medicion) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            msg: "Faltan datos",
            code: 400,
            errors: errors.array(),
          });
        }

        var dispositivoAux = await dispositivo.findOne({
          where: {
            external_id: req.body.external_dispositivo,
          },
        });
        if (!dispositivoAux) {
          return res.status(404).json({
            msg: "El dispositivo no existe",
            code: 404,
          });
        }

        const data = {
          uv: req.body.uv,
          fecha: req.body.fecha,
          id_dispositivo: dispositivoAux.id,
        };
        data.external_id = uuid.v4();
        await medicion.create(data, {
          transaction,
        });
        await transaction.commit();
        return res.status(200).json({
          msg: "Medicion Creada",
          code: 200,
          info: data,
        });
      } else {
        console.log(req.params.external_medicion);
        const medicionAux = await medicion.findOne({
          where: {
            external_id: req.params.external_medicion,
          },
        });

        if (!medicionAux) {
          return res.status(404).json({
            msg: "La medicion no existe",
            code: 404,
          });
        }
        medicionAux.uv = req.body.uv;
        medicionAux.fecha = req.body.fecha;
        medicionAux.external_id = uuid.v4();
        medicionAux.id_dispositivo = req.body.id_dispositivo;

        await medicionAux.save();
        await transaction.commit();

        return res.status(200).json({
          msg: "Se han modificado los datos de la medicion!",
          code: 200,
        });
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(500).json({
        msg: "Error en el servidor",
        code: 500,
      });
    }
  }
  async listar(req, res) {
    try {
      var lista;
      if (!req.params.external_dispositivo) {
        lista = await medicion.findAll({
          include: [
            {
              model: dispositivo,
              as: "dispositivo",
            },
          ],
        });
      } else {
        console.log(req.params.external_dispositivo);
        const dispositivoAux = await dispositivo.findOne({
          where: {
            external_id: req.params.external_dispositivo,
          },
        });

        if (!dispositivoAux) {
          return res.status(404).json({
            msg: "El dispositivo no existe",
            code: 404,
          });
        }
        lista = await medicion.findAll({
          where: {
            id_dispositivo: dispositivoAux.id,
          },
          include: [
            {
              model: dispositivo,
              as: "dispositivo",
            },
          ],
        });
      }
      if (!lista) {
        return res.status(404).json({
          msg: "No hay registros",
          code: 404,
        });
      }
      return res.status(200).json({
        msg: "Lista de mediciones",
        code: 200,
        info: lista,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error en el servidor",
        code: 500,
        error: error,
      });
    }
  }
}

module.exports = new MedicionController();
