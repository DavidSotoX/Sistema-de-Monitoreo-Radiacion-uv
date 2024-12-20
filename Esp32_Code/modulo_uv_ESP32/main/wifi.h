#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include <WiFi.h>

extern const char *ssid1;
extern const char *password1;
extern const char *ssid2;
extern const char *password2;
extern const IPAddress ip;
extern const IPAddress gateway;
extern const IPAddress mask;

void setupWiFi();
void connectToWiFi(const char *ssid, const char *password);

#endif // WIFI_H
