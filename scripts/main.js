document.querySelector('img').onclick = function () {
    var miSrc = document.querySelector('img').getAttribute('src');
    if (miSrc === 'images/loli.jpg') { //Para no generar un error si no existe la imagen
      document.querySelector('img').setAttribute('src','images/goblin.png');
      //setAttribute() el primer termino elige el atributo a modificar y el segundo es la modificación
    } else {
      document.querySelector('img').setAttribute('src', 'images/loli.jpg');
    }
}
var miBoton = document.querySelector('button');
var miTitulo = document.querySelector( 'h1');
function estableceNombreUsuario() {
    var miNombre = prompt('Por favor, ingresa tu nombre.');
    localStorage.setItem('nombre', miNombre); //en miNombre se guarda lo insertado en el prompt
    miTitulo.textContent = 'Bienvenido ' + miNombre +', esto sera divertido!';
}
if (!localStorage.getItem('nombre')) { //Si no existe registro del item nombre se inicia la funcion
    estableceNombreUsuario();
}
else {
    var nombreAlmacenado = localStorage.getItem('nombre');
    miTitulo.textContent = 'Bienvenido ' + nombreAlmacenado +', esto sera divertido!';
}
miBoton.onclick = function() { //Cada vez que se pulsa el boton se sobrescribe el item nombre
    estableceNombreUsuario();
}
