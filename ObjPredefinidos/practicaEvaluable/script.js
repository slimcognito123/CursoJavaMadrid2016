var pomodoro;
var seccion =1;
var temporizador;
var minutos;
var segundos;
var sonar = true;
var intervaloReloj;
var continuar=true;
function main() {
    document.getElementsByName("botonInicio")[0].onclick = entrarEnPagina;
    document.getElementsByName("settings")[0].onclick = changeSettings;
    document.getElementsByName("play")[0].onclick = iniciarTiempo;
    document.getElementsByName("pause")[0].onclick = pararTiempo;
    document.getElementsByName("stop")[0].onclick = stopearTiempo;
    document.getElementsByName("pomodoreando")[0].onclick = function(){cambiar(1)};
    document.getElementsByName("minidescanso")[0].onclick = function(){cambiar(2)};
    document.getElementsByName("descansaco")[0].onclick = function(){cambiar(3)};
    botonesActivados(false,true,true);
    temporizador = document.getElementById("muestraReloj");
    pomodoro = new pomodoroSettings(25, 5, 15, "music/GoForthAndDie.mp3");
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
    botonesActivados(true,false,false);
    botonesFunciones(true,true,true);
    if(continuar){
        if (seccion == 1)
        minutos = pomodoro.pomodoro;
    else if (seccion == 2)
        minutos = pomodoro.pausa;
    else if(seccion==3)
        minutos = pomodoro.descanso;
    }
    sonar=true;
    continuar=true
    var intervaloReloj = setInterval(function(){mostrarTiempo()}, 1);
}

function mostrarTiempo() {
    if(continuar){
        if (segundos > 0) {
            segundos--;
        } else if (segundos == 0) {
            if (minutos > 0) {
                minutos--;
                segundos += 59;
            } else if (sonar === true) {
                sonar = false;
                botonesActivados(false,false,false); botonesFunciones(false,false,false);
                alarma(true);
                clearInterval(intervaloReloj);
            }
        }
        if (minutos.toString().length < 2) temporizador.innerHTML = "0" + minutos;
        else temporizador.innerHTML = minutos;
        if (segundos.toString().length < 2) temporizador.innerHTML += ":0" + segundos;
        else temporizador.innerHTML += ":" + segundos;
    }
}

function pararTiempo(){
    botonesActivados(false,true,false);
    botonesFunciones(true,true,true);

    continuar=false;
}

function stopearTiempo(){
    botonesFunciones(false,false,false);
    continuar=false;
    if (seccion == 1)
        minutos = pomodoro.pomodoro;
    else if (seccion == 2)
        minutos = pomodoro.pausa;
    else
        minutos = pomodoro.descanso;
    segundos=0;
    if (minutos.toString().length < 2) temporizador.innerHTML = "0" + minutos;
    else temporizador.innerHTML = minutos;
    if (segundos.toString().length < 2) temporizador.innerHTML += ":0" + segundos;
    else temporizador.innerHTML += ":" + segundos;
    botonesActivados(false,false,true);
}
function botonesActivados(play,pause,stop){
    document.getElementsByName("play")[0].disabled=play;
    document.getElementsByName("pause")[0].disabled=pause;
    document.getElementsByName("stop")[0].disabled=stop;
}
function botonesFunciones(pomo,descanso,descansoLargo){
    document.getElementsByName("pomodoreando")[0].disabled=pomo;
    document.getElementsByName("minidescanso")[0].disabled=descanso;
    document.getElementsByName("descansaco")[0].disabled=descansoLargo;
}
function alarma(activar){
    if(activar){
        document.getElementById("alarma").style.display="block";
        document.getElementsByTagName("audio")[0].src=pomodoro.musica;
        document.getElementsByTagName("audio")[0].play();
    }else{
        document.getElementById("alarma").style.display="none";
        document.getElementsByTagName("audio")[0].pause();
    }
}
function cambiar(nCambio){
    seccion=nCambio;
}
