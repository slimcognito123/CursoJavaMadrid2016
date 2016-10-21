var cambiarFF = 0;

function cambiarFuente(div) {
    switch (cambiarFF) {
        case 0:
            div.style.fontFamily = "Times New Roman";
            break;
        case 1:
            div.style.fontFamily = "mmw";
            break;
        case 2:
            div.style.fontFamily = "CloisterBlack";
            break;
        case 3:
            div.style.fontFamily = "Freshman";
            break;
        case 4:
            div.style.fontFamily = "Luna";
            break;
        case 5:
            div.style.fontFamily = "SERAT KAYU";
            break;
    }
    cambiarFF++;
    if (cambiarFF == 6) cambiarFF = 0;
}

function cambiarMouse() {
    document.body.style.cursor = "url(images/mouse.png)";
}
