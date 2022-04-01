const webSocketServer = require("websocket").server;
const http = require('http');
const port = 3000;
const fs = require('fs').promises;

const teclasTeclado = {
    "0": "0", // dó  - a
    "1": "1", // ré  - s
    "2": "2", // mi  - d
    "3": "3", // fá  - f
    "4": "4", // sol - g
    "5": "5", // lá  - h
    "6": "6", // sí  - j
};

var notaRecebida = 0;

let fileHTML;

const requestListener = function(req, res) {
    res.setHeader("Content-types", "text-html");
    res.writeHead(200);
    res.end(fileHTML);
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + "../../index.html")
    .then(contents => { 
        fileHTML = contents;
        server.listen(port, (res) => {
            console.log(`Servidor conectado na porta http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.log("Could not found html page !!! " + error);
        process.exit(1);
    });

const ws = new webSocketServer({
    httpServer: server
});

ws.on('request', (request, response) => {
    
    let client = request.accept(null, request.origin);
    
    client.on('message', (message) => {
        //Se é uma mensagem string utf8
        if (message.type === 'utf8') {
            //Mostra no console a mensagem
            console.log("Enviando: ", message.utf8Data);
        }

        notaRecebida = message.utf8Data;
        
    });
    
    setInterval(() => {
        if(teclasTeclado[notaRecebida]) {
            client.sendUTF(teclasTeclado[notaRecebida]);
        } else {
            client.sendUTF("7");
        }
    }, 1);
        
        
    client.on('close', () => {
        console.log("Conexão fechada.");
    });
});