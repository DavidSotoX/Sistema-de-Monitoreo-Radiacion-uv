var models = require("../models");
const dispositivo = models.dispositivo;
const medicion = models.medicion;

const { validationResult } = require("express-validator");
const uuid = require("uuid");

class DispositivoController {
  async guardar(req, res) {
    const transaction = await models.sequelize.transaction({ timeout: 30000 });
    try {
      if (!req.params.external_dispositivo) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            msg: "Faltan datos",
            code: 400,
            errors: errors.array(),
          });
        }
        const data = {
          identificador: req.body.identificador,
          latitud: req.body.latitud,
          longitud: req.body.longitud,
          estado: req.body.estado,
          medicion: {
            uv: req.body.uv,
            fecha: req.body.fecha,
          },
        };

        data.external_id = uuid.v4();
        await dispositivo.create(data, {
          include: [
            {
              model: medicion,
              as: "medicion",
            },
          ],
          transaction,
        });
        await transaction.commit();
        return res.status(200).json({
          msg: "Se ha registrado el dispositivo",
          code: 200,
        });
      } else {
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
        const medicionAux = await medicion.findOne({
          where: {
            id_dispositivo: dispositivoAux.id,
          },
        });

        dispositivoAux.identificador = req.body.identificador;
        dispositivoAux.latitud = req.body.latitud;
        dispositivoAux.longitud = req.body.longitud;
        dispositivoAux.estado = req.body.estado;
        dispositivoAux.external_id = uuid.v4();
        await dispositivoAux.save();
        return res.status(200).json({
          msg: "Se han modificado los datos del dispositivo!",
          code: 200,
        });
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(500).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }
  async listar(req, res) {
    try {
      var lista;
      if (!req.params.external_dispositivo) {
        lista = await dispositivo.findAll({
          include: {
            model: medicion,
            as: "medicion",
          },
        });
      } else {
        lista = await dispositivo.findOne({
          where: {
            external_id: req.params.external_dispositivo,
          },
          include: {
            model: medicion,
            as: "medicion",
          },
        });
      }
      return res.status(200).json({
        msg: "Lista obtenida",
        code: 200,
        info: lista,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }
}
module.exports = new DispositivoController();
