// En tu archivo gps.cpp
#include "gps.h"

const int RXD2 = 16;
const int TXD2 = 17;

HardwareSerial neogps(1);  // Ajusta los pines RX y TX según tus conexiones
TinyGPSPlus gps;

void initializeGPS() {
  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);
  Serial.println("Inicializando GPS...");
  Serial.println("GPS listo.");
}

float getLatitude() {
    Serial.print("Latitud: ");
    Serial.println(gps.location.lat(), 6);
    return gps.location.lat();
}

float getLongitude() {
    Serial.print("Longitud: ");
    Serial.println(gps.location.lng(), 6);
    return gps.location.lng();
}