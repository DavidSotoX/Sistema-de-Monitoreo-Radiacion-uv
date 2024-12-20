#ifndef SERVER_COMMUNICATION_H
#define SERVER_COMMUNICATION_H

#include <Arduino.h>
#include <HTTPClient.h>

extern const char *serverUrl;

void almacenarIP(IPAddress serverIP);
void sendToServer(String data);

#endif  // SERVER_COMMUNICATION_H
