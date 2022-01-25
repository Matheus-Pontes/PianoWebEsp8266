# Piano Web Esp8266

- ![projeto](/pianoWEB.png)

## Projeto
- O projeto nasceu de uma ideia já pronta com botões fisicos conectados ao ESP. Contudo, eu não tinha a quantidade de botões necessária para as notas básicas de um teclado.
    - Sendo:
        - DÓ, RÉ, MÍ, FÁ, SOL, LÁ, SÍ.
- Com isso, pensei em desenhar o piano simples em html/css e conectado a um servidor websocket feito em NodeJS. Onde fica ouvindo, aguardando, enviando e recebendo mensagens, tecnologia muito utilizada para criação de chats online. E assim nasceu o Piano Web Esp kk.

 ### Funcionamento

 - Ao iniciar o servidor com o comando
    `node server.js`
    e a conexão ter sucesso, ao clicar nas teclas [a, s, d, f, g, h, j] do teclado de seu computador, elas representam respectivamente as notas [ DÓ, RÉ, MÍ, FÁ, SOL, LÁ, SÍ ]. 
 - São enviados para o ESP8266, uns valores que estão no arquivo `src/script.js`, e validados no arquivo `esp8266 code/pianoWEB.ino`.
 - Ao receber esses valores ele respectivamente colocar a frequência da nota no buzzer e verá a mágica acontecendo.

 - Obs: A pasta src contem os arquivos separados do front-end. O index.html é o arquivo frontend que contem o css e js juntos, já que não cosnegui fazer com que o server reconhece-se a pasta src como um todo e assim, o server levanta o index.html com tudo junto.

 ### Vídeo
 - ![projeto](/pianoWEBESP.gif)

## Tecnologias
- HTML/CSS
- NodeJS
    - websocket
- ESP8266
