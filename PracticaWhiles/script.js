function Usuario(nombre, apellidos, usuario, emilio, fechaNacimiento, password){
    this.nombre=nombre;
    this.apellidos=apellidos;
    this.usuario=usuario;
    this.emilio=emilio;
    this.fechaNacimiento=fechaNacimiento;
    this.password=password;
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
