var pomodoro;
var seccion =1;
var temporizador;
var minutos;
var segundos;
var sonar = true;
var intervaloReloj;
function main() {
    document.getElementsByName("botonInicio")[0].onclick = entrarEnPagina;
    document.getElementsByName("settings")[0].onclick = changeSettings;
    document.getElementsByName("play")[0].onclick = iniciarTiempo;
    temporizador = document.getElementById("muestraReloj");
    pomodoro = new pomodoroSettings(25, 5, 15, "music/song1.mp3");
    segundos = 0;

}

function entrarEnPagina() {
    document.getElementById("presentacion").style.display = "none";
    document.getElementsByTagName("main")[0].style.display = "block";
}

function changeSettings() {

}

function pomodoroSettings(tiempoPomodoro, pausaCorta, pausaLarga, song) {
    this.pomodoro = tiempoPomodoro;
    this.pausa = pausaCorta;
    this.descanso = pausaLarga;
    this.musica = song;
}

function iniciarTiempo() {
    if (seccion == 1)
        minutos = pomodoro.pomodoro;
    else if (seccion == 2)
        minutos = pomodoro.pausa;
    else
        minutos = pomodoro.descanso;
    sonar=true;
    var intervaloReloj = setInterval(function(){mostrarTiempo()}, 1);
}

function mostrarTiempo() {
    if (segundos > 0) {
        segundos--;
    } else if (segundos == 0) {
        if (minutos > 0) {
            minutos--;
            segundos += 59;
        } else if (sonar === true) {
            sonar = false;
            clearInterval(intervaloReloj);
        }
    }
    if (minutos.toString().length < 2) temporizador.innerHTML = "0" + minutos;
    else temporizador.innerHTML = minutos;
    if (segundos.toString().length < 2) temporizador.innerHTML += ":0" + segundos;
    else temporizador.innerHTML += ":" + segundos;
}
