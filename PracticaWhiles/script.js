var user //Usuario
var lista //Array
var aceptable=-1;//introductor
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
function enviarFormulario(){
    for(var i=0;i<4&&introductor==-1;i++){
        validar(i);
    }
    if(introductor==-1){
        user = new Usuario(document.getElementsByName('nombre')[0].value,
                       document.getElementsByName('apellidos')[0].value,
                      document.getElementsByName('user')[0].value,
                      document.getElementsByName('emilio')[0].value,
                      document.getElementsByName('nacimiento')[0].value,
                      document.getElementsByName('pass')[0].value);
        vaciarFormulario();
    }

}
function vaciarFormulario(){
    document.getElementsByName('nombre')[0].value="";
    document.getElementsByName('apellidos')[0].value="";
    document.getElementsByName('nacimiento')[0].value="";
    document.getElementsByName('user')[0].value="";
    document.getElementsByName('emilio')[0].value="";
    document.getElementsByName('pass')[0].value="";
    document.getElementsByName('pass2')[0].value="";
}
function validar(numero){
    document.getElementById('mensajeError').innerHTML="";
    var verError=document.getElementById('mensajeError');
    switch(numero){
        case 0:
            if(document.getElementsByName('nombre')[0].value.trim().length()>=2) introductor=-1;
            else{
                introductor=1;
                verError.innerHTML+="nombre mal introducido<br/>"
            }
            break;
        case 1:
             if(document.getElementsByName('apellidos')[0].value) introductor=-1
             else{
                 introductor=2;
                 verError.innerHTML+="apellido mal introducido<br/>"
             }
            break;
        case 2:
            if(calcularAnos(new Date(document.getElementsByName('nacimiento')[0].value))>=18)
                introductor=-1;
            else{
                introductor=3;
                verError.innerHTML+="edad insuficiente<br/>";
            }
            break;
        case 3:
            if(comprobarEnLista(false,document.getElementsByName('user')[0].value)) introductor=-1;
            else{
                introductor=4;
                verError.innerHTML+="nombre de usuario ya existente<br/>"
            }
            break;
        case 4:
            if(comprobarEnLista(true,document.getElementsByName('emilio')[0].value)) introductor=-1;
            else{
                introductor=5;
                verError.innerHTML+="correo ya existente<br/>"
            }
            break;
        case 5:
            if(document.getElementsByName('pass')[0].value==document.getElementsByName('pass2')[0].value)
                introductor=-1;
            else{
                introductor=5;
                verError.innerHTML+="las contrase&ntilde;as no concuerdan<br/>"
            }
    }
}
function comprobarEnLista(tipo,string){
    if(lista!=null){
        for(var j=0;j<lista.length();j++){
            if(!tipo)if(lista[i].usuario.value==string)return false;
            else if(lista[i].emilio==string) return false;
        }
    }
    return true;
}
