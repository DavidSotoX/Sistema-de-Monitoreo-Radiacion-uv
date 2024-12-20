// En tu archivo main.ino
#include <Wire.h>
#include "wifi.h"
#include "guva_sensor.h"
#include "server_communication.h"
#include "gps.h"

void setup() {
  Serial.begin(115200);
  setupWiFi();
  // Inicializa y obtén la posición del GPS al encender el dispositivo
  IPAddress localIP = WiFi.localIP();
  Serial.println("IP: ");
  Serial.println(localIP);
  initializeGPS();
}

void loop() {
  float uvVoltage = readGUVA();
  
  if (uvVoltage >= 0.0) {
    // Construye el JSON con la información del GPS y del sensor UV
    String jsonData = "{\"code\":200,\"msg\":\"ok\",\"info\":{\"posicion\": {\"longitud\":" + String(getLongitude()) + ",\"latitud\":" + String(getLatitude()) + "},\"uv\":" + String(uvVoltage) + "}}";
    
    Serial.println("Datos a enviar al servidor: " + jsonData);

    // Envía los datos al servidor
    sendToServer(jsonData);

    Serial.println("Esperando 1 minuto antes de realizar la próxima lectura y envío");
    delay(60000);  // espera 30 segundos
  }
}

