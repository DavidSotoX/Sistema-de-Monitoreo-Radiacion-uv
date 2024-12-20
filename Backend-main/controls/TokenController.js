var models = require("../models");
const token = models.peticion_token;
const cuenta = models.cuenta;
const uuid = require("uuid");
const { validationResult } = require("express-validator");
class TokenController {
  async guardar(req, res) {
    const transaction = await models.sequelize.transaction({ timeout: 30000 });
    try {
      if (!req.params.external_token) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            msg: "Faltan datos",
            code: 400,
            errors: errors.array(),
          });
        }
        const data = {
          habilitado: req.body.habilitado,
        };
        data.external_id = uuid.v4();

        await token.create(data, {
          transaction,
        });
        await transaction.commit();
        return res.status(200).json({
          msg: "Token Creado",
          code: 200,
          info: data,
        });
      } else {
        const tokenAux = await token.findOne({
          where: {
            external_id: req.params.external_token,
          },
        });
        if (!tokenAux) {
          return res.status(404).json({
            msg: "El token no existe",
            code: 404,
          });
        }
        if (req.body.external_cuenta) {
          var cuentaAux = await cuenta.findOne({
            where: {
              external_id: req.body.external_cuenta,
            },
          });
          if (!cuentaAux) {
            return res.status(404).json({
              msg: "La cuenta no existe",
              code: 404,
            });
          }
          cuentaAux.estado = "ACEPTADO";
          cuentaAux.id_token = tokenAux.id;
          await cuentaAux.save();
        }
        tokenAux.habilitado = req.body.habilitado;
        tokenAux.nro_peticiones = req.body.nro_peticiones;

        await tokenAux.save();
        await transaction.commit();
        return res.status(200).json({
          msg: "Token modificado",
          code: 200,
          info: tokenAux,
        });
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(400).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }

  async listar(req, res) {
    var lista;
    try {
      if (!req.params.external_token) {
        lista = await token.findAll({
          include: {
            model: cuenta,
            as: "cuenta",
            attributes: ["correo", "estado", "rol", "clave"],
          },
        });
      } else {
        lista = await token.findOne({
          where: {
            external_id: req.params.external_token,
          },
          include: {
            model: cuenta,
            as: "cuenta",
            attributes: ["correo", "estado", "rol", "clave"],
          },
        });
      }
      return res.status(200).json({
        msg: "Lista Obtenida",
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
module.exports = new TokenController();
