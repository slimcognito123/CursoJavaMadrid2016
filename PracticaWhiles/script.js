var user //Usuario
var lista //Array
var verError; //id del error
var introductor=-1;//es valido o no
function main(){
    verError=document.getElementById('mensajeError');
    lista=new Array();
}
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
    return anos;
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
    for(var i=0;i<6/*&&introductor==-1*/;i++){
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
        introducirEnArray(user);
        for(var j=0;j<lista.length;j++){
            alert(lista[j].nombre);
        }
        cargarListaEnTabla();
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
    switch(numero){
        case 0:
            if(document.getElementsByName('nombre')[0].value.trim().length>=2) introductor=-1;
            else{
                introductor=1;
                verError.innerHTML="nombre mal introducido<br/>"
            }
            break;
        case 1:
             if(document.getElementsByName('apellidos')[0].value.trim().length>=2) introductor=-1
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
            if(/^\w{3,}@[a-z|A-Z]{3,}[.][a-z|A-Z]{2,3}$/.test(document.getElementsByName('emilio')[0].value)&&comprobarEnLista(true,document.getElementsByName('emilio')[0].value)) introductor=-1;
            else{
                introductor=5;
                verError.innerHTML+="correo ya existente o no valido<br/>"
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
        for(var j=0;j<lista.length&&lista.length>0;j++){
            if(!tipo){
                if(lista[j].usuario==string)return false;
            }else{
                if(lista[j].emilio==string) return false;
            }
        }
    }
    if(lista.length>0)
    alert("oliwis"+lista[j-1].emilio+" comparado con: "+string);
    return true;
}
function introducirEnArray(user){
    lista.push(this.user);
    user=new Usuario();
}
function cargarListaEnTabla(){
    var meter=document.getElementById('introducirAqui')
    meter.innerHTML="";
    for(var k=0;k<lista.length&&lista!=null;k++){
        meter.innerHTML+="<tr><td>"+lista[k].usuario+"</td><td>"+lista[k].nombre+"</td><td>"+calcularAnos(new Date(lista[k].fechaNacimiento))+'</td><td>'+lista[k].emilio+'</td><td><input type="button" name="" value="borrar" onclick="eliminar('+k+')"></td><td><input type="button" name="" value="modificar" onclick="modificar()"></td></tr>';
    }
}
function eliminar(intPosicion){
    if(intPosicion==0)  lista.shift();
    else lista.splice(intPosicion,intPosicion);
    cargarListaEnTabla();
}
