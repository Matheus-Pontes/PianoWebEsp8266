#include <ArduinoWebsockets.h> // baixar lib e adicionar na idle do arduino
#define BUZZER D2

const char* ssid = "<nome do seu wifi local>";
const char* pass = "<senha>";
const char* IP = "<seu endereço IP local>";
const int wsPort = 3000; // porta que vai se conectar ao websocket sendo igual no arquivo server/server.js

// Frequências de cada nota musical
const int a = 261; // Dó
const int b = 293; // Ré
const int c = 329; // Mi
const int d = 349; // Fá
const int e = 391; // Sol
const int f = 440; // Lá
const int g = 493; // Si

using namespace websockets;

WebsocketsClient client;

void setup() {
  // put your setup code here, to run once:

  // Definindo buzzer como saída
  pinMode(BUZZER, OUTPUT);
  noTone(BUZZER);
  

  // Iniciando conexeção com o WIFI local  
  Serial.begin(115200);

  WiFi.begin(ssid, pass);

  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("Conectado ao WIFI!!!");

  // Iniciando conexão ao websocket do NodeJs
  // Sendo o ESP8266 como cliente
  bool connected = client.connect(IP, wsPort, "/");

  if(connected) {
    Serial.println("Conectado ao server!");

    // Enviando ao servidor que está conectado
    client.send("Conectado ao server!");   
  } else {
    Serial.println("Sem conexão!");
    return;
  }

  // Se está conectado, vai esperar receber a mensagem
  client.onMessage([&](WebsocketsMessage message){

    // Escreve mensagem recebida no Serial do arduino
    Serial.print("Valor recebido: ");
    Serial.println(message.data());
   
    if(message.data().equalsIgnoreCase("0")) {
        tone(BUZZER, a);
    } else if(message.data().equalsIgnoreCase("1")) {
        tone(BUZZER, b);
    } else if(message.data().equalsIgnoreCase("2")) {
        tone(BUZZER, c);
    } else if(message.data().equalsIgnoreCase("3")) {
        tone(BUZZER, d);
    } else if(message.data().equalsIgnoreCase("4")) {
        tone(BUZZER, e);
    } else if(message.data().equalsIgnoreCase("5")) {
        tone(BUZZER, f);
    } else if(message.data().equalsIgnoreCase("6")) {
        tone(BUZZER, g);
    } else {
        noTone(BUZZER);
      
    }
  });
}

void loop() {
  // put your main code here, to run repeatedly:

  // Avalia se recebeu a mensagem
  if(client.available()) {

    // captura a mensagem enviada que vai ser usada no setup()
    client.poll();
  } 

  delay(1);
}
