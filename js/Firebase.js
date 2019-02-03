function registrar(){
  var emailS = document.getElementById('EmailS').value;
  var nombre = document.getElementById('Username').value;
  var contrasenaS = document.getElementById('Password1').value;
  var contrasenaS2 = document.getElementById('Password2').value;
  if(contrasenaS == contrasenaS2){
  firebase.auth().createUserWithEmailAndPassword(emailS, contrasenaS)
  .then(function(){
    console.log('Registrando...');
    location.href="index.html";
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
  });
  } else {
    // TODO: que pasa si no son iguales.
  }
}

function ingreso(){
  var emailL = document.getElementById('EmailL').value;
  var contrasenaL = document.getElementById('PasswordL').value;
  firebase.auth().signInWithEmailAndPassword(emailL, contrasenaL)
  .then(function(){
    console.log('Ingresando...');
    location.href="index.html";
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
  });
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario activo');
    useriniciada();
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    console.log('no existe usuario activo');
    usernoiniciada();
    // User is signed out.
    // ...
  }
});
}
observador();

function usernoiniciada(){
  var contenido = document.getElementById('registrar/ingresar');
  contenido.innerHTML = `
  <a role="button" class="btn btn-outline-primary  izquierda" style="color: #0066cc;" data-toggle="modal" data-target="#exampleModal">Ingresar</a>

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Inicio de sesión</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group">
        <label for="EmailL">Direccion de correo electronico</label>
        <input type="email" class="form-control" id="EmailL" placeholder="Ingrese correo electronico">
      </div>
      <div class="form-group">
        <label for="PasswordL">Contraseña</label>
        <input type="password" class="form-control" id="PasswordL" placeholder="Ingrese contraseña">
      </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="ingreso()">Ingresar</button>
      </div>
    </div>
  </div>
  </div>

  <a role="button" class="btn btn-outline-secondary  izquierda" style="color: #666699;" data-toggle="modal" data-target="#exampleModal2">Registrarse</a>

  <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Registro de sesión</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group">
        <label for="EmailS">Direccion de correo electronico</label>
        <input type="email" class="form-control" id="EmailS" aria-describedby="emailHelp" placeholder="Ingrese correo electronico">
        <small id="emailHelp" class="form-text text-muted">No se compartira tu correo con nadie más.</small>
      </div>
      <div class="form-group">
        <label for="Username">Nombre de usuario</label>
        <input type="Username" class="form-control" id="Username" placeholder="Ingrese Nombre de usuario">
      </div>
      <div class="form-group">
        <label for="Password1">Contraseña</label>
        <input type="password" class="form-control" id="Password1" placeholder="Ingrese contraseña">
      </div>
      <div class="form-group">
        <label for="Password2">Verifique Contraseña</label>
        <input type="password" class="form-control" id="Password2" placeholder="Ingrese contraseña">
      </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="registrar()">Registrarse</button>
      </div>
    </div>
  </div>
  </div>
  `;
}

function useriniciada(){
  var contenido = document.getElementById('cerrar');
  contenido.innerHTML = `
  <a role="button" onclick="cerrar()" class="btn btn-outline-secondary  izquierda">Cerrar sesión</a>
  `;
}

function cerrar() {
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo...');
    location.href="index.html";
  })
  .catch(function(error){
    console.log(error);
  })
}
