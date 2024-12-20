#include "server_communication.h"

const char *serverUrl = "http://192.168.0.144/pis/lectura_uv_azure.php";

void almacenarIP(IPAddress serverIP) {
  // Tu implementación aquí si es necesario
}

void sendToServer(String data) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(data);
  if (httpResponseCode != 200) {
    Serial.println("Error en la solicitud HTTP.");
  }
  http.end();
}
