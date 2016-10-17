var comprador,vendedor,casa;
var cuentaComprador,cuentaVendedor;

function main() {

	cuentaComprador=new CuentaBancaria("123456789",1000000000);
	cuentaVendedor=new CuentaBancaria("321321321",200000);

	comprador=new Persona("Pepito","Garcia","88888888T","images/tio1.jpg",cuentaComprador);
	vendedor=new Persona("Pako","sjafdhj","34567347Q","images/tio2.png",cuentaVendedor);
	casa=new Casa(300000,"Calle falsa 123","700","images/casita.jpg",vendedor);

	mostrarPersona(comprador,"mostrarDatos1");
	mostrarPersona(vendedor,"mostrarDatos2");
	mostrarCasa(casa,"casa");
}
function Persona(nombre,apellido,dni,image,cuentaBancaria) {
	this.nombre=nombre;
	this.apellido=apellido;
	this.dni=dni;
	this.image=image;
	this.cuentaBancaria=cuentaBancaria;
}
function CuentaBancaria(numeroCuenta,CantidadDinero){
	this.numeroCuenta=numeroCuenta;
	this.CantidadDinero=CantidadDinero;
}
function Casa(precio,Direccion,metros,image,propietario) {
	this.precio=precio;
	this.direccion=Direccion;
	this.metros=metros;
	this.image=image;
	this.propietario=propietario;
}
function mostrarPersona(persona,id){
	document.getElementById(id).innerHTML="nombre: "+persona.nombre+"  "+
		persona.apellido+"<br/>dni: "+persona.dni+"<br/>foto: <img src='"+
		persona.image+"' height='300' width='300'></img><br/>cuenta: "+persona.cuentaBancaria.numeroCuenta+
		"<br/>saldo: "+persona.cuentaBancaria.CantidadDinero;
}
function mostrarCasa(casa,id) {
	document.getElementById(id).innerHTML="precio: "+casa.precio+"  "+
		"<br/>Direccion: "+casa.direccion+"<br/>metros: "+
		casa.metros+"<br/>foto: <img src='"+casa.image+"' height='300' width='300'></img>"+
		"<br/>propietario: "+casa.propietario.nombre;
}
function comprar() {
	comprarCasa(casa,comprador);
}
function comprarCasa(casa,comprador2){
	casa.propietario.cuentaBancaria.CantidadDinero+=casa.precio;
	casa.propietario=comprador2;

	var aux = vendedor;
	vendedor=comprador;
	comprador=aux;

	casa.propietario.cuentaBancaria.CantidadDinero-=casa.precio;
	mostrarPersona(comprador,"mostrarDatos1");
	mostrarPersona(vendedor,"mostrarDatos2");
	mostrarCasa(casa,"casa");
}
