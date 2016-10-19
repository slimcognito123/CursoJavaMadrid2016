function main(){
    document.getElementsByName("botonInicio")[0].onclick=entrarEnPagina;
    document.getElementsByName("settings")[0].onclick=changeSettings;
}
function entrarEnPagina(){
    document.getElementById("presentacion").style.display="none";
    document.getElementsByTagName("main")[0].style.display="block";
}
function changeSettings(){

}
