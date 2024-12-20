"use strict";
//Modelos
var models = require("../models");
const persona = models.persona;
const cuenta = models.cuenta;

//Librerias
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const saltRounds = 8;

//Clase
class UserController {
  async guardar(req, res) {
    const transaction = await models.sequelize.transaction({ timeout: 30000 });
    try {
      if (!req.params.external_persona) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            msg: "Faltan datos",
            code: 400,
            errors: errors.array(),
          });
        }
        const claveHash = (clave) => {
          return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
        };
        var description_pdf;
        if (!req.file) {
          description_pdf = "No se ha subido el archivo de la solicitud";
        } else {
          description_pdf = req.file.filename;
        }
        const data = {
          nombres: req.body.nombres,
          apellidos: req.body.apellidos,
          fecha_nacimiento: req.body.fecha_nacimiento,
          cargo: req.body.cargo,
          institucion: req.body.institucion,
          cuenta: {
            correo: req.body.correo,
            clave: claveHash(req.body.clave),
            rol: req.body.rol,
            description: req.body.description,
            description_pdf: description_pdf,
          },
        };
        if (!data.cuenta.description) {
          data.cuenta.description = "No se ha subido descripción";
        }
        if (
          data.cuenta.description &&
          data.cuenta.description_pdf === "authorized by admin"
        ) {
          data.cuenta.estado = "ACEPTADO";
        }
        if (data.cuenta.rol === "ADMINISTRADOR") {
          data.cuenta.estado = "ACEPTADO";
        }
        data.external_id = uuid.v4();
        await persona.create(data, {
          include: [
            {
              model: models.cuenta,
              as: "cuenta",
            },
          ],
          transaction,
        });
        await transaction.commit();
        return res.status(200).json({
          msg: "Se ha registrado la persona",
          code: 200,
        });
      } else {
        const personaAux = await persona.findOne({
          where: {
            external_id: req.params.external_persona,
          },
        });

        if (!personaAux) {
          return res.status(400).json({
            msg: "No existe el registro",
            code: 400,
          });
        }

        const cuentaAux = await cuenta.findOne({
          where: {
            id_persona: personaAux.id,
          },
        });

        personaAux.nombres = req.body.nombres;
        personaAux.apellidos = req.body.apellidos;
        personaAux.fecha_nacimiento = req.body.fecha_nacimiento;
        personaAux.cargo = req.body.cargo;
        personaAux.institucion = req.body.institucion;
        cuentaAux.estado = req.body.estado;
        personaAux.external_id = uuid.v4();

        const personaResult = await personaAux.save();
        const cuentaResult = await cuentaAux.save();
        var tokenResult;
        if (cuentaResult.token) {
          tokenResult = cuentaResult.token.external_id;
        } else {
          tokenResult = "token no asignado";
        }
        return res.status(200).json({
          msg: "Se han modificado su datos!",
          code: 200,
          info: {
            user: {
              nombres: personaResult.nombres,
              apellidos: personaResult.apellidos,
              external_persona: personaResult.external_id,
              fecha_nacimiento: personaResult.fecha_nacimiento,
              institucion: personaResult.institucion,
              cargo: personaResult.cargo,
              correo: cuentaResult.correo,
              rol: cuentaResult.rol,
              external_cuenta: cuentaResult.external_id,
              description: cuentaResult.description,
              description_pdf: cuentaResult.description_pdf,
              token: tokenResult,
            },
          },
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
    try {
      var lista;
      if (!req.params.external_persona) {
        lista = await persona.findAll({
          attributes: [
            "nombres",
            "apellidos",
            "external_id",
            "fecha_nacimiento",
            "cargo",
            "institucion",
          ],
          include: {
            model: cuenta,
            as: "cuenta",
            attributes: [
              "correo",
              "estado",
              "rol",
              "clave",
              "description",
              "description_pdf",
              "external_id",
            ],
          },
        });
      } else {
        lista = await persona.findOne({
          where: {
            external_id: req.params.external_persona,
          },
          attributes: [
            "nombres",
            "apellidos",
            "external_id",
            "fecha_nacimiento",
            "cargo",
            "institucion",
          ],
          include: {
            model: cuenta,
            as: "cuenta",
            attributes: [
              "correo",
              "estado",
              "rol",
              "clave",
              "description",
              "description_pdf",
              "external_id",
            ],
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

  async eliminar(req, res) {
    try {
      const personaAux = await persona.findOne({
        where: {
          external_id: req.params.external_persona,
        },
      });
      if (!personaAux) {
        return res.status(400).json({
          msg: "No existe el registro",
          code: 400,
        });
      }
      const cuentaAux = await cuenta.findOne({
        where: {
          id_persona: personaAux.id,
        },
      });
      await personaAux.destroy();
      await cuentaAux.destroy();
      return res.status(200).json({
        msg: "Se ha eliminado el registro",
        code: 200,
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
module.exports = new UserController();
