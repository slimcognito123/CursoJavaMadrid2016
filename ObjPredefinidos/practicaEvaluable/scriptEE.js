var cambiarFF = 0;
var fondo=1;
function cambiarFuente(div) {
    switch (cambiarFF) {
        case 0:
            div.style.fontFamily = "Times New Roman";
            break;
        case 1:
            div.style.fontFamily = "mmw";
            break;
        case 2:
            div.style.fontFamily = "CloisterBlack";
            break;
        case 3:
            div.style.fontFamily = "Freshman";
            break;
        case 4:
            div.style.fontFamily = "Luna";
            break;
        case 5:
            div.style.fontFamily = "SERAT KAYU";
            break;
    }
    cambiarFF++;
    if (cambiarFF == 6) cambiarFF = 0;
}

function cambiarFondo() {
    fondo++;
    if(fondo==4) fondo=1;
    if(fondo==1)
        document.body.style.background= "linear-gradient(to left, #FFF, grey)";
    else if(fondo==2)
        document.body.style.background= "linear-gradient(to left, #FF2628, #8EF5AC)";
    else if(fondo==3)
        document.body.style.background= "linear-gradient(to left, #F426FF, #15FBCC)";
}
function tomateVolador(){
    document.getElementsByTagName("spam")[0].innerHTML="Pomodoro <img src='images/mouse.png' id='tomato' height='100' width='110'>"
    document.getElementById("tomato").style.animation="volar 5s linear";
}
