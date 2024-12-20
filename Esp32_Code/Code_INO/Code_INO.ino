#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <esp_sleep.h>

#define PIN_UV 36

const char *ssid = "WiFi";
const char *password = "WiFi_Password";

const IPAddress ip(192,168,100,200);
const IPAddress gateway(192,168,100,1);
const IPAddress mask(255,255,255,0);

const char *serverUrl = "http://192.168.100.8/pis/semaforo_pis.php";

float latitude = 0.0;
float longitude = 0.0;

void getWiFiLocation() {
  int numNetworks = WiFi.scanNetworks();
  if (numNetworks > 0) {
    latitude = WiFi.RSSI(0);
    longitude = WiFi.channel(0);
    Serial.print("Estimated Latitud: ");
    Serial.println(latitude);
    Serial.print("Estimated Longitud: ");
    Serial.println(longitude);
  } 
}

float readGUVA(int pin) { // Leer datos del sensor GUVA-S12SD
  int uvLevel = analogRead(PIN_UV);
  if(uvLevel!=0){
    float voltage = uvLevel * (5.0/1024.0);
    return voltage/.1;
  }
  return 0;
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

void loop() {
  float uvVoltage = readGUVA(PIN_UV);
  if(uvVoltage != 0){
    String jsonData = "{\"code\":200,\"msg\":\"ok\",\"info\":{\"posicion\": {\"longitud\":" + String(longitude) + ",\"latitud\":" + String(latitude) + "},\"uv\":" + String(uvVoltage) + "}}";
    Serial.println("Datos a enviar al servidor: "+ jsonData);
    sendToServer(jsonData); // Enviar datos al servidor
    Serial.println("Esperando 30 segundos antes de realizar la próxima lectura y envío");
    delay(30000);
  }

}

void setup() {
  Serial.begin(115200);
  WiFi.config(ip, gateway, mask); // Conéctate a WiFi con IP estática
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  Serial.println("Conectado a la red WiFi");
  getWiFiLocation(); 
}