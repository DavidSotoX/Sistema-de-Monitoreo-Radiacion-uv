#ifndef GUVA_SENSOR_H
#define GUVA_SENSOR_H

#include <Arduino.h>
extern const int voltaje5V;
// extern const int PIN_3V3;
extern const int PIN_UV;

float averageAnalogRead(int pinToRead);
float mapfloat(float x, float in_min, float in_max, float out_min, float out_max);
float readGUVA();

#endif  // GUVA_SENSOR_H
