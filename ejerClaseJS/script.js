var alday;
var Datos;
var muestraDatos,muestraFecha;
function main(){
    alday=new Array();
    Datos=new detalles();
    muestraDatos=3
    muestraFecha=false;

}
function detalles(){
    this.nombre="";
    this.apellido1="";
    this.apellido2="";
    this.nacimiento=new Date();
    this.estudios=new Date();
    this.conducir=new Date();
}
function enviarDatos(){
    if(new Date()<new Date(document.getElementsByName("nacimiento")[0].value)){
        alert("fecha de nacimiento incorrecta");
    }else if(new Date()<new Date(document.getElementsByName("estudios")[0].value)){
        alert("fecha de final de estudios incorrecta");
    }else if(new Date()<new Date(document.getElementsByName("conducir")[0].value)){
        alert("fecha de carnet de conducir incorrecta");
    }else{
        colocarDatos();
    }
}
function colocarDatos(){

    Datos.nombre=document.getElementsByName("nombre")[0].value;
    if(document.getElementsByName("apellidos")[0].value.charAt(0)==" "){
        var comprobante=document.getElementsByName("apellidos")[0].value;
        while(comprobante.charAt(0)==" "){
            comprobante=document.getElementsByName("apellidos")[0].value.substr(1,document.getElementsByName("apellidos")[0].value.length-1);
        }
        var apellidos=comprobante.split(" ");
    }else{
        var apellidos=document.getElementsByName("apellidos")[0].value.split(" ");
    }
    Datos.apellido1=apellidos[0];
    Datos.apellido2=apellidos[1];
    Datos.nacimiento=new Date(document.getElementsByName("nacimiento")[0].value);
    Datos.estudios=new Date(document.getElementsByName("estudios")[0].value);
    Datos.conducir=new Date(document.getElementsByName("conducir")[0].value);
    alday.push(Datos);
    for(var i=0;i<alday.length;i++){
        alert(alday[i].nombre);
    }
    Datos=new detalles();
    mostrarLista();
    mostrarDatos();
}


function mostrarLista(){
    document.getElementById("listaPersonas").innerHTML="primero de la lista: "+alday[0].nombre+" "+alday[0].apellido1+"<br/>"+
        "ultimo de la lista: "+alday[alday.length-1].nombre+" "+alday[alday.length-1].apellido1
}
function mostrarDatos(){
    document.getElementById("nombre").innerHTML=alday[alday.length-1].nombre;
    document.getElementById("apellido1").innerHTML=alday[alday.length-1].apellido1;
    document.getElementById("apellido2").innerHTML=alday[alday.length-1].apellido2;
    if(!muestraFecha){
        document.getElementById("fNaci").innerHTML=alday[alday.length-1].nacimiento.getDate() + "/" + (alday[alday.length-1].nacimiento.getMonth() +1) + "/" + alday[alday.length-1].nacimiento.getFullYear()

        document.getElementById("fCondu").innerHTML=alday[alday.length-1].conducir.getDate() + "/" + (alday[alday.length-1].conducir.getMonth() +1) + "/" + alday[alday.length-1].conducir.getFullYear();

        document.getElementById("fEstudios").innerHTML=alday[alday.length-1].estudios.getDate() + "/" + (alday[alday.length-1].estudios.getMonth() +1) + "/" + alday[alday.length-1].estudios.getFullYear()
    }else{
        document.getElementById("fNaci").innerHTML= (alday[alday.length-1].nacimiento.getMonth() +1)+ "/" +alday[alday.length-1].nacimiento.getDate() +  "/" + alday[alday.length-1].nacimiento.getFullYear()

        document.getElementById("fCondu").innerHTML=(alday[alday.length-1].conducir.getMonth() +1) + "/" + alday[alday.length-1].conducir.getDate() + "/" + alday[alday.length-1].conducir.getFullYear();

        document.getElementById("fEstudios").innerHTML=(alday[alday.length-1].estudios.getMonth() +1) + "/" + alday[alday.length-1].estudios.getDate() + "/" + alday[alday.length-1].estudios.getFullYear()
    }
    document.getElementById("edad").innerHTML=calcularAnos(alday[alday.length-1].nacimiento);
    document.getElementById("aCondu").innerHTML=calcularAnos(alday[alday.length-1].conducir);
    document.getElementById("aEstudios").innerHTML=calcularAnos(alday[alday.length-1].estudios);
}
function calcularAnos(fecha){
    var anos,meses,dias,restador;
    restador=false;
    anos=new Date().getFullYear()-fecha.getFullYear();
    meses=(new Date().getMonth()+1)-(fecha.getMonth()+1);
    if(meses<0){
        anos--;
        meses=fecha.getMonth()+meses+1;
        restador=true;
    }
    dias=new Date().getDate()-fecha.getDate();
    if(dias<0){
        meses--;
        dias=diasMesTotales(fecha)-fecha.getDate()+new Date().getDate();
        if(meses<0){
            anos--;
            meses=fecha.getMonth()+meses+1;
            restador=true;
        }
    }
    if(muestraDatos==3){
        return "a&ntilde;os: "+anos;
    }else if(muestraDatos==2){
        return "a&ntilde;os: "+anos+" meses: "+meses;
    }else{
        return "a&ntilde;os: "+anos+" meses: "+meses+"dias: "+dias;
    }
}
function cambiar(numero){
    muestraDatos=numero;
    mostrarDatos();
}
function change(){
    muestraFecha=!muestraFecha;
    mostrarDatos();
}
function diasMesTotales(fecha){
    var mes=fecha.getMonth()+1;
    var dia=fecha.getDate();
    var bisiesto;
    if(fecha.getFullYear%400==0||fecha.getFullYear%4==0&&fecha.getFullYear%100!=0) bisiesto=true;
    else bisiesto=false;
    if(mes==1||mes==3||mes==5||mes==7||mes==8||mes==10||mes==12){
        return 31;
    }else if(mes==2){
        if(bisiesto) return 29;
        else return 28;
    }else{
        return 30;
    }
}
function eliminarUltimo(){
    alert("se ha eliminado a "+alday.pop().nombre);
    mostrarLista();
}
