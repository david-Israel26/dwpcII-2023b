var objetos = new Array();
    objetos[0] = "https://i.ibb.co/fHkdP7f/tec1.jpg";
    objetos[1] = "https://i.ibb.co/CP0bS42/tec2.jpg";

    function aleatorio() 
    {
        var azar = Math.floor(Math.random() * objetos.length);
        document.images["imagen"].src = objetos[azar];
    }