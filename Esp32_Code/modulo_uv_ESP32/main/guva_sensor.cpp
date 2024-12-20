#include "guva_sensor.h"

const int voltaje5V = 5.0;
const int PIN_UV = 36;
const int ajusteAcetato = 150;

float averageAnalogRead(int pinToRead) {
  byte numberOfReadings = 8;
  unsigned int runningValue = 0;
  for (int x = 0; x < numberOfReadings; x++)
    runningValue += analogRead(pinToRead);
  runningValue /= numberOfReadings;
  return (float)runningValue;
}

float mapfloat(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

float readGUVA() {
  float outputVoltage;
  int uvLevel = averageAnalogRead(PIN_UV);
  //int refLevel = averageAnalogRead(PIN_3V3);
  Serial.println("Valor " + String(uvLevel)); // Imprimir el valor del pin 3V3
  if (uvLevel > 0) {
    outputVoltage = ((uvLevel / 4095 * voltaje5V) + ajusteAcetato)/100 ;
  } else if(uvLevel = 0){
    outputVoltage = 0.0;
  }

  
  //float uvIntensity = mapfloat(outputVoltage, 0.99, 5.0, 0.0, 15.0);
  Serial.println(" Tensión (mV): " + String(outputVoltage));
  return outputVoltage;
}
