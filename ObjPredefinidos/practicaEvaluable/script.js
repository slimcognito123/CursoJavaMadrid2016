var pomodoro;
var seccion = 1;
var temporizador;
var minutos;
var segundos;
var sonar = true;
var intervaloReloj;
var continuar = 1;
var tarea;
var alday = [];
var interrupcion = null;
var aldayInterrupciones = [];
var tareaActiva = null;

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
    document.getElementsByName("interrupt")[0].onclick = function () {
        viewInterr(true);
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

function oscurecer(variedad){
    if(variedad)document.getElementsByTagName("main")[0].style.opacity=0.3;
    else document.getElementsByTagName("main")[0].style.opacity=1;
}

function viewSettings(activar) {
    if (activar) {
        document.getElementById("settings").style.display = "block";
        botonesActivados(true, true, true);
        botonesFunciones(true, true, true);
        oscurecer(true);
    } else {
        document.getElementById("settings").style.display = "none";
        botonesActivados(true, false, false);
        botonesFunciones(false, false, false);
        oscurecer(false);
    }
}

function viewTasks(activar) {
    if (activar) {
        document.getElementById("tasks").style.display = "block";
        botonesActivados(true, true, true);
        botonesFunciones(true, true, true);
        oscurecer(true);
    } else {
        document.getElementById("tasks").style.display = "none";
        botonesActivados(true, false, false);
        botonesFunciones(false, false, false);
        oscurecer(false);
    }
}

function viewInterr(activar) {
    if (activar) {
        document.getElementById("interruptions").style.display = "block";
        document.getElementsByName("interrutionsTasks")[0].innerHTML = "";
        for (var i = 0; i < alday.length && alday.length > 0; i++) {

            if (i == tareaActiva) document.getElementsByName("interrutionsTasks")[0].innerHTML += '<option value="' + i + '" selected>' + alday[i].name + '</option>';
            else document.getElementsByName("interrutionsTasks")[0].innerHTML += '<option value="' + i + '">' + alday[i].name + '</option>';
        }
        botonesActivados(true, true, true);
        botonesFunciones(true, true, true);
        oscurecer(true);
    } else {
        document.getElementById("interruptions").style.display = "none";
        botonesActivados(true, false, false);
        botonesFunciones(false, false, false);
        oscurecer(false);
    }
}

function changeSettings() {
    pomodoro = new pomodoroSettings(document.getElementsByName("pomodoroTime")[0].value, document.getElementsByName("SRest")[0].value, document.getElementsByName("LRest")[0].value,
        document.getElementsByName("song")[0].value);
    clean(document.getElementsByName("pomodoroTime")[0]);
    clean(document.getElementsByName("SRest")[0]);
    clean(document.getElementsByName("LRest")[0]);
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

function clean(selection) {
    selection.value = ""
}

function comprobarTask() {
    var tsk = document.getElementsByName("task")[0].value.trim();
    var np = document.getElementsByName("numPomo")[0].value;
    if (np == NaN || np == "" || np < 1 || tsk == "") {
        alert("changes not accepted, check it")
    } else {
        createTask();
        viewTasks(false);
    }
}

function comprobarInterr() {
    var ttl = document.getElementsByName("title")[0].value.trim();
    var durm = document.getElementsByName("durm")[0].value.trim();
    var durs = document.getElementsByName("durs")[0].value.trim();
    var tsk = document.getElementsByName("interrutionsTasks")[0].value;
    if (durm == NaN || durm == "" || durm < 0 || durs == NaN || durs == "" || durs < 0 || durs > 59 || ttl == "" || tsk == "") {
        alert("changes not accepted, check it")
    } else {
        viewInterr(false);
        createInterruption();
    }
}

function createTask() {
    tarea = new task(document.getElementsByName("task")[0].value.trim(), document.getElementsByName("numPomo")[0].value);
    introducirAlday(tarea);
    tarea = null;
    clean(document.getElementsByName("task")[0])
    clean(document.getElementsByName("numPomo")[0])
    visualizarAlday();
}

function createInterruption() {
    interrupcion = new interruptionObj(document.getElementsByName("title")[0].value.trim(), document.getElementsByName("durm")[0].value.trim(), document.getElementsByName("durs")[0].value.trim(), document.getElementsByName("interrutionsTasks")[0].value);
    aldayInterrupciones.push(interrupcion);
    interrupcion = null;
    clean(document.getElementsByName("title")[0]);
    clean(document.getElementsByName("durm")[0]);
    clean(document.getElementsByName("durs")[0]);
    visualizarAldayInterrupciones();
}

function introducirAlday(task) {
    alday.push(task);
}

function pomodoroSettings(tiempoPomodoro, pausaCorta, pausaLarga, song) {
    this.pomodoro = tiempoPomodoro;
    this.pausa = pausaCorta;
    this.descanso = pausaLarga;
    this.musica = song;
}

function task(name, numPeriods) {
    this.name = name;
    this.numPeriods = numPeriods;
    this.realPeriods = 0;
    this.iTime = 0;
    this.state = "pending"; //pending unfinish finished
}

function interruptionObj(title, timeM, timeS, task) {
    this.title = title;
    this.timeM = timeM;
    this.timeS = timeS;
    this.task = task;
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

function visualizarAlday() {
    document.getElementById("estoPaLasTareas").innerHTML = "";
    for (var i = 0; i < alday.length; i++) {
        document.getElementById("estoPaLasTareas").innerHTML += "<tr><td>" + alday[i].name + "</td><td>" + alday[i].numPeriods + "</td><td>" + alday[i].realPeriods + "</td><td class='inter'>" + alday[i].iTime + "</td><td>" + alday[i].state + "</td><td><input type='button' value='select' name='begin' onclick='selectTask(" + i + ")'></td><td><input type='button' name='end' value='end' onclick='endTask(" + i + ")'></td></tr>";
    }

}

function visualizarAldayInterrupciones() {
    var minu;
    var sec;
    document.getElementById("estoPaInterrupciones").innerHTML = "";
    for (var i = 0; i < aldayInterrupciones.length; i++) {
        if (aldayInterrupciones[i].timeM < 10) minu = "0" + aldayInterrupciones[i].timeM;
        else minu = aldayInterrupciones[i].timeM;
        if (aldayInterrupciones[i].timeS < 10) sec = "0" + aldayInterrupciones[i].timeS;
        else sec = aldayInterrupciones[i].timeS;

        document.getElementById("estoPaInterrupciones").innerHTML += "<tr><td>" + aldayInterrupciones[i].title + "</td><td>" + minu + ":" + sec + "</td><td>" + alday[aldayInterrupciones[i].task].name + "</td></tr>";
    }
    document.getElementById("estoPaInterrupciones").innerHTML += "<tr><td>total:</td><td>" + TimeSum() + "</td><td></td></tr>";
    enviarDatosInter();
    visualizarAlday();
}

function enviarDatosInter() {
    for (var i = 0; i < alday.length; i++) {
        var mins = 0;
        var secs = 0;
        for (var j = 0; j < aldayInterrupciones.length; j++) {
            if (aldayInterrupciones[j].task == i) {
                mins += parseInt(aldayInterrupciones[j].timeM);
                secs += parseInt(aldayInterrupciones[j].timeS);
                if (secs >= 60) {
                    secs -= 60;
                    mins++;
                }
            }
        }
        if (secs < 10) alday[i].iTime = mins + ":0" + secs;
        else alday[i].iTime = mins + ":" + secs;
    }
}

function TimeSum(variante) {
    var mins = 0;
    var secs = 0;
    for (var i = 0; i < aldayInterrupciones.length; i++) {
        mins += parseInt(aldayInterrupciones[i].timeM);
        secs += parseInt(aldayInterrupciones[i].timeS);
        if (secs >= 60) {
            secs -= 60;
            mins++;
        }
    }
    if (secs < 10) return mins + ":0" + secs;
    return mins + ":" + secs;
}

function iniciarTiempo() {
    botonesActivados(true, false, false);
    botonesFunciones(true, true, true);
    if (continuar) {
        cambiarMinutos();
    }
    sonar = true;
    continuar = true
    intervaloReloj = setInterval(function () {
        mostrarTiempo()
    }, 1000);
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
                if (tareaActiva != null && seccion == 1) {
                    alday[tareaActiva].realPeriods++;
                    visualizarAlday();
                }
                botonesActivados(false, false, false);
                botonesFunciones(false, false, false);
                alarma(true);
                clearInterval(intervaloReloj);
            }
        }
        visualizar();
    }
}

function pararTiempo() {
    botonesActivados(false, true, false);
    botonesFunciones(true, true, true);

    clearInterval(intervaloReloj);
    continuar = false;
}

function stopearTiempo() {
    if (tareaActiva != null && continuar && seccion == 1) {
        alday[tareaActiva].realPeriods++;
        visualizarAlday();
    }
    botonesFunciones(false, false, false);
    botonesActivados(false, false, true);

    clearInterval(intervaloReloj);
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

function botonesFunciones(pomo, descanso, descansoLargo, inter) {
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

function selectTask(posicion) {
    if (alday[posicion].state == "finished") {
        alert("finished tasks cannot be done again")
    } else {
        alday[posicion].state = "unfinish";
        tareaActiva = posicion;
        botonesActivados(false, true, true);
    }
    visualizarAlday();
}

function endTask(posicion) {
    alday[posicion].state = "finished"
    if (tareaActiva == posicion) tareaActiva = null;
    visualizarAlday();
}
