//Modelos
var models = require("../models");
const cuenta = models.cuenta;
const peticion_token = models.peticion_token;
const persona = models.persona;
//Librerias
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Clase
class CuentaController {
  async login(req, res) {
    try {
      var cuentaAux = await cuenta.findOne({
        where: {
          correo: req.body.correo,
        },
        include: [
          {
            model: persona,
            as: "persona",
          },
          {
            model: peticion_token,
            as: "peticion_token",
          },
        ],
      });

      if (!cuentaAux)
        return res.status(400).json({
          msg: "Cuenta no encontrada",
          code: 400,
        });
      var esClaveValida = function (clave, claveUser) {
        return bcrypt.compareSync(claveUser, clave);
      };

      if (!esClaveValida(cuentaAux.clave, req.body.clave)) {
        return res.status(200).json({
          msg: "Clave incorrecta",
          code: 400,
        });
      }
      const tokenData = {
        external_token: cuentaAux.external_id,
        email: cuentaAux.correo,
        check: true,
      };

      require("dotenv").config();
      const llave = process.env.KEY_LOGIN;
      const token = jwt.sign(tokenData, llave, {
        expiresIn: "2h",
      });
      var tokenAux;
      if (!cuentaAux.peticion_token) {
        tokenAux = "token no asignado";
      } else {
        tokenAux = cuentaAux.peticion_token.external_id;
      }
      return res.status(200).json({
        msg: "Bienvenido " + cuentaAux.persona.nombres,
        info: {
          token: token,
          user: {
            nombres: cuentaAux.persona.nombres,
            apellidos: cuentaAux.persona.apellidos,
            external_persona: cuentaAux.persona.external_id,
            fecha_nacimiento: cuentaAux.persona.fecha_nacimiento,
            institucion: cuentaAux.persona.institucion,
            description: cuentaAux.description,
            description_pdf: cuentaAux.description_pdf,
            cargo: cuentaAux.persona.cargo,
            token: tokenAux,
            correo: cuentaAux.correo,
            rol: cuentaAux.rol,
            external_cuenta: cuentaAux.external_id,
          },
        },
        code: 200,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }

  async acceso(req, res) {
    if (req.params.isAdmin) {
      return res.status(200).json({
        msg: "Admin autorizado",
        code: 200,
      });
    }
    const token = await peticion_token.findOne({
      where: {
        external_id: req.body["api-key"],
      },
    });
    if (!token || !token.habilitado) {
      return res.status(401).json({
        msg: "La llave no es válida o no esta habilitada",
        code: 401,
      });
    }
    return res.status(200).json({
      msg: "Acceso Autorizado",
      code: 200,
    });
  }
}
module.exports = new CuentaController();
