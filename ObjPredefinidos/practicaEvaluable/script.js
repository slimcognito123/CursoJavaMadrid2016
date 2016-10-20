var pomodoro;
var seccion = 1;
var temporizador;
var minutos;
var segundos;
var sonar = true;
var intervaloReloj;
var continuar=1;
var tarea;
var alday = [];
var tareaActiva=null;
function main() {
    document.getElementsByName("botonInicio")[0].onclick = entrarEnPagina;
    document.getElementsByName("settings")[0].onclick = viewSettings;
    document.getElementsByName("play")[0].onclick = iniciarTiempo;
    document.getElementsByName("pause")[0].onclick = pararTiempo;
    document.getElementsByName("stop")[0].onclick = stopearTiempo;
    document.getElementsByName("pomodoreando")[0].onclick = function () {
        cambiar(1)
    };
    document.getElementsByName("minidescanso")[0].onclick = function () {
        cambiar(2)
    };
    document.getElementsByName("descansaco")[0].onclick = function () {
        cambiar(3)
    };
    document.getElementsByName("crearTarea")[0].onclick = function () {
       viewTasks(true);
    };
    botonesActivados(false, true, true);
    temporizador = document.getElementById("muestraReloj");
    pomodoro = new pomodoroSettings(25, 5, 15, "music/GoForthAndDie.mp3");
    segundos = 0;

}

function entrarEnPagina() {
    document.getElementById("presentacion").style.display = "none";
    document.getElementsByTagName("main")[0].style.display = "block";
}

function viewSettings(activar) {
    if (activar) {
        document.getElementById("settings").style.display = "block";
        botonesActivados(true, true, true);
        botonesFunciones(true, true, true);
    } else {
        document.getElementById("settings").style.display = "none";
        botonesActivados(true, false, false);
        botonesFunciones(false, false, false);
    }
}
function viewTasks(activar) {
    if (activar) {
        document.getElementById("tasks").style.display = "block";
        botonesActivados(true, true, true);
        botonesFunciones(true, true, true);
    } else {
        document.getElementById("tasks").style.display = "none";
        botonesActivados(true, false, false);
        botonesFunciones(false, false, false);
    }
}
function changeSettings() {
    pomodoro = new pomodoroSettings(document.getElementsByName("pomodoroTime")[0].value, document.getElementsByName("SRest")[0].value, document.getElementsByName("LRest")[0].value,
        document.getElementsByName("song")[0].value);
}

function comprobarSettings() {
    var pm = document.getElementsByName("pomodoroTime")[0].value;
    var sr = document.getElementsByName("SRest")[0].value;
    var lr = document.getElementsByName("LRest")[0].value;
    if (pm == NaN || pm == "" || pm < 1 || sr == NaN || sr == "" || sr < 1 || lr == NaN || lr == "" || lr < 1) {
        alert("changes not accepted, check it")
    } else {
        changeSettings();
        cambiarMinutos();
        segundos = 0;
        visualizar();
        viewSettings(false);
    }
}

function comprobarTask() {
    var tsk = document.getElementsByName("task")[0].value.trim();
    var np = document.getElementsByName("numPomo")[0].value;
    if (np == NaN || np == "" || np < 1||tsk=="") {
        alert("changes not accepted, check it")
    } else {
        createTask();
        viewTasks(false);
    }
}
function createTask(){
    tarea=new task(document.getElementsByName("task")[0].value.trim(),document.getElementsByName("numPomo")[0].value);
    introducirAlday(tarea);
    tarea=null;
    visualizarAlday();
}
function introducirAlday(task){
    alday.push(task);
}
function pomodoroSettings(tiempoPomodoro, pausaCorta, pausaLarga, song) {
    this.pomodoro = tiempoPomodoro;
    this.pausa = pausaCorta;
    this.descanso = pausaLarga;
    this.musica = song;
}

function task(name, numPeriods){
    this.name = name;
    this.numPeriods = numPeriods;
    this.realPeriods = 0;
    this.state="pending";//pending unfinish finished
}

function cambiarMinutos() {
    if (seccion == 1)
        minutos = pomodoro.pomodoro;
    else if (seccion == 2)
        minutos = pomodoro.pausa;
    else if (seccion == 3)
        minutos = pomodoro.descanso;
}

function visualizar() {
    if (minutos.toString().length < 2) temporizador.innerHTML = "0" + minutos;
    else temporizador.innerHTML = minutos;
    if (segundos.toString().length < 2) temporizador.innerHTML += ":0" + segundos;
    else temporizador.innerHTML += ":" + segundos;
}

function visualizarAlday(){
    document.getElementById("estoPaLasTareas").innerHTML="";
    for(var i=0; i<alday.length;i++){
        document.getElementById("estoPaLasTareas").innerHTML+="<tr><td>"+alday[i].name+"</td><td>"+alday[i].numPeriods+"</td><td>"+alday[i].realPeriods+"</td><td>"+alday[i].state+"</td><td><input type='button' value='select' name='begin' onclick='selectTask("+i+")'></td><td><input type='button' name='end' value='end' onclick='endTask("+i+")'></td></tr>";
    }
}

function iniciarTiempo() {
    botonesActivados(true, false, false);
    botonesFunciones(true, true, true);
    if (continuar) {
        cambiarMinutos();
    }
    sonar = true;
    continuar = true
    var intervaloReloj = setInterval(function () {
        mostrarTiempo()
    }, 1);
}

function mostrarTiempo() {
    if (continuar) {
        if (segundos > 0) {
            segundos--;
        } else if (segundos == 0) {
            if (minutos > 0) {
                minutos--;
                segundos += 59;
            } else if (sonar === true) {
                sonar = false;
                continuar = false;
                if(tareaActiva!=null&&seccion == 1){
                    alday[tareaActiva].realPeriods++;
                    visualizarAlday();
                }
                botonesActivados(false, false, false);
                botonesFunciones(false, false, false);
                alarma(true);
                clearInterval(intervaloReloj);
            }
        }
        visualizar()
    }
}

function pararTiempo() {
    botonesActivados(false, true, false);
    botonesFunciones(true, true, true);

    continuar = false;
}

function stopearTiempo() {
    if(tareaActiva!=null&&continuar&&seccion == 1){
        alday[tareaActiva].realPeriods++;
        visualizarAlday();
    }
    botonesFunciones(false, false, false);
    botonesActivados(false, false, true);

    continuar = false;
    if (seccion == 1)
        minutos = pomodoro.pomodoro;
    else if (seccion == 2)
        minutos = pomodoro.pausa;
    else
        minutos = pomodoro.descanso;
    segundos = 0;
    visualizar();
}

function botonesActivados(play, pause, stop) {
    document.getElementsByName("play")[0].disabled = play;
    document.getElementsByName("pause")[0].disabled = pause;
    document.getElementsByName("stop")[0].disabled = stop;
}

function botonesFunciones(pomo, descanso, descansoLargo,inter) {
    document.getElementsByName("pomodoreando")[0].disabled = pomo;
    document.getElementsByName("minidescanso")[0].disabled = descanso;
    document.getElementsByName("descansaco")[0].disabled = descansoLargo;
}

function alarma(activar) {
    if (activar) {
        document.getElementById("alarma").style.display = "block";
        document.getElementsByTagName("audio")[0].src = pomodoro.musica;
        document.getElementsByTagName("audio")[0].play();
    } else {
        document.getElementById("alarma").style.display = "none";
        document.getElementsByTagName("audio")[0].pause();
    }
}

function cambiar(nCambio) {
    seccion = nCambio;
    cambiarMinutos();
    segundos = 0;
    visualizar();
}

function selectTask(posicion){
    if(alday[posicion].state=="finished"){
        alert("finished tasks cannot be done again")
    }else{
        alday[posicion].state="unfinish";
        tareaActiva=posicion;
        botonesActivados(false, true, true);
    }
    visualizarAlday();
}
function endTask(posicion){
    alday[posicion].state="finished"
    if(tareaActiva==posicion)tareaActiva=null;
    visualizarAlday();
}
