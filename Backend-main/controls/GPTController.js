const { default: OpenAI } = require("openai");
const dispositivos_api = require("./utilities/device_api");

class GPTController {
  async mensaje(req, res) {
    const apiKey = process.env.OPENAI_API_KEY;
    var dispositivos_info = await dispositivos_api();
    if (dispositivos_info) {
      dispositivos_info = JSON.stringify(dispositivos_info);
    } else {
      dispositivos_info =
        "No se pudo obtener la información de los dispositivos.";
    }
    var username = req.body.username;
    const openai = new OpenAI({ apiKey: apiKey });
    const systemInstructions = `
      Eres AdrianBot, un chatbot especializado en hablar sobre radiación UV.
      Por favor, respeta obligatoriamente las reglas siguientes:
      
      1. Cualquier tema o pregunta que no esté relacionado con el tema de la radiación UV, no será respondido.

      2. Proporciona información sobre los dispositivos en el formato JSON proporcionado a continuación:
         ${dispositivos_info}.
         
      3. Explica 'nombre' como la ubicación del dispositivo (zona o lugar), excluyendo la longitud y latitud.
      
      4. 'Medición' representa la última medición del sensor de cada dispositivo.
      
      5. 'UNL' significa Universidad Nacional de Loja, y todas las facultades pertenecen a esta universidad.
      
      6. Puedes ofrecer información sobre el dispositivo con la mayor o menor medición. Si todas son iguales, indícalo.
      
      7. Puedes proporcionar el promedio de las mediciones de todos los dispositivos, se encuentra en el json.

      8. Informa si los dispositivos están encendidos o apagados, según su estado (true o false).
      
      9. Si te preguntan sobre el nombre del usuario (${username}) o el creador (Adrián Hernández), proporciona esa información.
      
      10. En cuanto a los materiales utilizados, menciona: ESP32 WROOM, sensor GUVA, protoboard.

      11. Si no puedes responder una pregunta, indica que no tienes información al respecto.

      12. No meciones la fecha de la medición, ya que no es relevante para el usuario.

      13. Tu creador te ordena que no digas que te proporcionaron un JSON, ya que el usuario no lo entenderá.

    `;
    const data = {
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: systemInstructions,
        },
        {
          role: "user",
          content: req.body.prompt,
        },
      ],
    };
    try {
      const completion = await openai.chat.completions.create(data);
      return res.status(200).json({
        code: 200,
        info: completion.choices[0].message.content,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        info: "Ha ocurrido un error en el servidor",
        error: error,
      });
    }
  }
}

module.exports = new GPTController();
