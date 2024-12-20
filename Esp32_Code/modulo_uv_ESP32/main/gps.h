// En tu archivo gps.h
#ifndef GPS_H
#define GPS_H

#include <Wire.h>
//#include <TinyGPS.h>
#include <TinyGPS++.h>

extern const int RXD2;
extern const int TXD2;

extern HardwareSerial neogps;
extern TinyGPSPlus gps;

void initializeGPS();
float getLatitude();
float getLongitude();

#endif  // GPS_H
