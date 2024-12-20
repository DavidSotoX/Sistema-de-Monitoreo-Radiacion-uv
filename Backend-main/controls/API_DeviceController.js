const dispositivos_api = require("./utilities/device_api");
class API_DeviceController {
  async listar(req, res) {
    try {
      var dispositivos = await dispositivos_api();
      return res.status(200).json({
        msg: "Dispositivos",
        code: 200,
        info: dispositivos,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }
}
module.exports = new API_DeviceController();
