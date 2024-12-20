#include "wifi.h"

// Define varias redes WiFi con sus respectivas credenciales
const char *ssid2 = "HernandezGranda";
const char *password2 = "familiaHernandez1995.";

const char *ssid1 = "davisito150m";
const char *password1 = "1150394367S";

void setupWiFi()
{
  // Intenta conectar con la primera red WiFi
  connectToWiFi(ssid1, password1);

  // Si la conexión falla, intenta con la segunda red WiFi
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Falló la conexión a la primera red WiFi. Intentando con la segunda red.");
    connectToWiFi(ssid2, password2);
  }

  // Puedes agregar más bloques if/else para más redes WiFi si es necesario

  // Si la conexión aún no se ha establecido, muestra un mensaje de error
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Error: No se pudo conectar a ninguna red WiFi.");
  }
  else
  {
    Serial.println("Conectado a la red WiFi");
  }
}

void connectToWiFi(const char *ssid, const char *password)
{
  WiFi.begin(ssid, password);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20)
  {
    delay(1000);
    attempts++;
    Serial.print(".");
  }
  Serial.println();
}
