// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
//firebase
//Create
function registrar(){
  var emailS = document.getElementById('EmailS').value;
  var nombre = document.getElementById('Username').value;
  var contrasenaS = document.getElementById('Password1').value;
  var contrasenaS2 = document.getElementById('Password2').value;
  if(contrasenaS == contrasenaS2){
  firebase.auth().createUserWithEmailAndPassword(emailS, contrasenaS)
  .then(function(){
    db.collection("usuarios").doc(emailS).set({
      NombreUsuario: nombre,
      PuntuacionSpaceInvaders: 0,
      PuntuacionSnake: 0,
      PuntuacionTetris: 0
    })
    .then(function() {
        console.log("Se a creado el usuario exitosamente! Relacionado con el email: "+ emailS);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    console.log('Registrando...');
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
//Read
function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario activo');
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    miTabla(email);
    var docRef = db.collection("usuarios").doc(email);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().NombreUsuario);
            displayName = doc.data().NombreUsuario;
            useriniciada(displayName,email);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
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
//Update
function Editar(email){
  var userRef = db.collection("usuarios").doc(email);
  var nombre = document.getElementById('Username2').value;
  return userRef.update({
      NombreUsuario: nombre
  })
  .then(function() {
      console.log("El nombre de usuario fue cambiado exitosamente! :D\nTu nombre nuevo es: "+ nombre);
      location.href="index.html";
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
}
//Delete
function Eliminar(email){
  var user = firebase.auth().currentUser;
    db.collection("usuarios").doc(email).delete().then(function() {
      console.log("El usuario fue borrado exitosamente!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });
  location.href="index.html";
}

function usernoiniciada(){
  var contenido = document.getElementById('registrar/ingresar');
  contenido.innerHTML = `
  <a role="button" class="btn btn-primary  izquierda" style="color: #ffffff;" data-toggle="modal" data-target="#exampleModal">Ingresar</a>

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

  <a role="button" class="btn btn-secondary  izquierda" style="color: #ffffff" data-toggle="modal" data-target="#exampleModal2">Registrarse</a>

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
        <p class="posicion">Reinicie la pagina luego de registrarse</p>
      </div>
    </div>
  </div>
  </div>
  `;
}

function useriniciada(Nombre,EmailE){
  var contenido = document.getElementById('cerrar');
  contenido.innerHTML = `
  <h4>${Nombre}</h4>
  <a type="button" href="Puntuacion.html" class="btn btn-primary" role="button">Puntuaciones</a>
  <button onclick="cerrar()" class="btn btn-secondary">Cerrar sesión</button>
  `;
  var contenidoFinal = document.getElementById('Eliminar');
  contenidoFinal.innerHTML = `
  <button class="btn btn-warning  izquierda" data-toggle="modal" data-target="#exampleModal3">Editar nombre de usuario</button>
  <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar Nombre de usuario</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group">
        <label for="Username2">Nombre de usuario</label>
        <input type="Username" class="form-control" id="Username2" placeholder="Ingrese Nombre de usuario">
      </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" onclick="Editar('${EmailE}')">Editar</button>
      </div>
    </div>
  </div>
  </div>
  <button onclick="Eliminar('${EmailE}')" class="btn btn-danger  izquierda">Eliminar Cuenta</button>
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
//tabPuntuacion
function ActivarSItab(){
  var contenido = document.getElementById('tabPuntuacion');
  contenido.innerHTML = `
  <div class="col centro"><h2>Puntuaciones Globales</h2></div>
  <div class="row mx-auto">
    <div class="col">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active">Space Invaders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onclick="ActivarStab()">Snake</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onclick="ActivarTtab()">Tetris</a>
        </li>
      </ul>
    </div>
  </div>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre de usuario</th>
      <th scope="col">Puntuación</th>
    </tr>
  </thead>
  <tbody id="tabla">
  </tbody>
  </table>
  `;
  var tabla = document.getElementById('tabla');
  db.collection("usuarios").orderBy("PuntuacionSpaceInvaders","desc").limit(100).onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    var n=0;
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          n +=1;
          tabla.innerHTML += `
          <tr>
            <th scope="row">${n}</th>
            <td>${doc.data().NombreUsuario}</td>
            <td>${doc.data().PuntuacionSpaceInvaders}</td>
          </tr>
          `;
      });
  });
}

function ActivarStab(){
  var contenido = document.getElementById('tabPuntuacion');
  contenido.innerHTML = `
  <div class="col centro"><h2>Puntuaciones Globales</h2></div>
  <div class="row mx-auto">
    <div class="col">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" onclick="ActivarSItab()">Space Invaders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active">Snake</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onclick="ActivarTtab()">Tetris</a>
        </li>
      </ul>
    </div>
  </div>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre de usuario</th>
      <th scope="col">Puntuación</th>
    </tr>
  </thead>
  <tbody id="tabla">
  </tbody>
  </table>
  `;
  var tabla = document.getElementById('tabla');
  db.collection("usuarios").orderBy("PuntuacionSnake","desc").limit(100).onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    var n=0;
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          n +=1;
          tabla.innerHTML += `
          <tr>
            <th scope="row">${n}</th>
            <td>${doc.data().NombreUsuario}</td>
            <td>${doc.data().PuntuacionSnake}</td>
          </tr>
          `;
      });
  });
}

function ActivarTtab(){
  var contenido = document.getElementById('tabPuntuacion');
  contenido.innerHTML = `
  <div class="col centro"><h2>Puntuaciones Globales</h2></div>
  <div class="row mx-auto">
    <div class="col">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" onclick="ActivarSItab()">Space Invaders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onclick="ActivarStab()">Snake</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active">Tetris</a>
        </li>
      </ul>
    </div>
  </div>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre de usuario</th>
      <th scope="col">Puntuación</th>
    </tr>
  </thead>
  <tbody id="tabla">
  </tbody>
  </table>
  `;
  var tabla = document.getElementById('tabla');
  db.collection("usuarios").orderBy("PuntuacionTetris","desc").limit(100).onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    var n=0;
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          n +=1;
          tabla.innerHTML += `
          <tr>
            <th scope="row">${n}</th>
            <td>${doc.data().NombreUsuario}</td>
            <td>${doc.data().PuntuacionTetris}</td>
          </tr>
          `;
      });
  });
}
//UpdateScoreSnake
function EditarSnake(max){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario activo');
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    var docRef = db.collection("usuarios").doc(email);
    docRef.get().then(function(doc) {
      if(max>doc.data().PuntuacionSnake){
        if (doc.exists) {
          var userRef = db.collection("usuarios").doc(email);
          return userRef.update({
              PuntuacionSnake: max
          })
          .then(function() {
              console.log("El puntaje fue cambiado exitosamente! :D\nTu puntaje nuevo es: "+ max);
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        } }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    // ...
  } else {
    console.log('no existe usuario activo');
    // User is signed out.
    // ...
  }
});
}

function EditarSpaceInvaders(max){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario activo');
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    var docRef = db.collection("usuarios").doc(email);
    docRef.get().then(function(doc) {
      if(max>doc.data().PuntuacionSpaceInvaders){
        if (doc.exists) {
          var userRef = db.collection("usuarios").doc(email);
          return userRef.update({
              PuntuacionSpaceInvaders: max
          })
          .then(function() {
              console.log("El puntaje fue cambiado exitosamente! :D\nTu puntaje nuevo es: "+ max);
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        } }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    // ...
  } else {
    console.log('no existe usuario activo');
    // User is signed out.
    // ...
  }
});
}

function miTabla(email){
var miTabla = document.getElementById('miTabla');
db.collection("usuarios").doc(email).get().then(function(doc) {
  miTabla.innerHTML = '';
    if (doc.exists) {
        console.log(`${doc.id} => ${doc.data()}`);
        miTabla.innerHTML = `
        <tr>
          <th scope="row">Space Invaders</th>
          <td>${doc.data().PuntuacionSpaceInvaders}</td>
        </tr>
        <tr>
          <th scope="row">Snake</th>
          <td>${doc.data().PuntuacionSnake}</td>
        </tr>
        <tr>
          <th scope="row">Tetris</th>
          <td>${doc.data().PuntuacionTetris}</td>
        </tr>
        `;
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}
}).catch(function(error) {
console.log("Error getting document:", error);
});
}
