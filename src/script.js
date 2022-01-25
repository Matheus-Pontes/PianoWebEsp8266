let $teclasPiano = document.querySelectorAll(".notaMusical");

const teclasTeclado = {
    "a": "1", // dó
    "s": "2", // ré
    "d": "3", // mi
    "f": "4", // fá
    "g": "5", // sol
    "h": "6", // lá
    "j": "7", // sí
};

// const ws = new WebSocket("ws://localhost:3000");

$teclasPiano.forEach((item, index)=> {
    item.classList.add('sombraTecla');
    let $createTeclaPreta = "<div class='notaPreta'></div>"

    if(index == $teclasPiano.length - 1) {
        item.innerHTML = '';
    } else {
        item.innerHTML = $createTeclaPreta;
    }
});

window.onkeydown = function(e) {
    console.log("tecla clicada: ", e.key);

    if(teclasTeclado[e.key]) {
        // ws.send(teclasTeclado[e.key]);
        $teclasPiano.forEach((item, index) => {
            if(teclasTeclado[e.key] == index + 1){
                item.classList.remove('sombraTecla');
            }
        });
    } 
}

window.onkeyup = function(e) {
    console.log("tecla soltada: ", e.key);
    $teclasPiano.forEach((item, index) => {
        if(teclasTeclado[e.key] == index + 1){
            item.classList.add('sombraTecla');
        }
    });
    // ws.send("0");
}