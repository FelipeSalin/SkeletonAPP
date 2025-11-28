import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Dbservice } from '../../services/dbService/dbservice';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {

  isDBReady: boolean = false;

  constructor(private router: Router,
              private activateroute: ActivatedRoute,
              private navCtrl: NavController,
              private alertController: AlertController,
              private dbService: Dbservice) { } // Se debe instanciar

  ngOnInit() {
    this.dbService.getIsDBReady().subscribe(isReady => {
      this.isDBReady = isReady;
      if (isReady) {
        // Aquí puedes llamar a funciones para cargar datos, etc. desde la base de datos
      }
    });
  }

  usuario={
    email:"",
    nombre:"",
    apellido:"",
    username:"",
    password:"",
    nacimiento:""
  }

  password2: string = "";

  // Método para mostrar alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Función para validar el formato usuario
  validarEmail(user: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar email
    return emailRegex.test(user);
  }

  registro() {
    // Verificar que base de datos esté lista
    if (!this.isDBReady) {
      this.mostrarAlerta('La base de datos aún no está lista.');
      return;
    }

    // Verificar que el campo de correo no esté vacío
    if (!this.usuario.email) {
      this.mostrarAlerta('El campo de email no puede estar vacío.');
      return;
    }

    //Validar el formato del correo
    if (!this.validarEmail(this.usuario.email)) {
      this.mostrarAlerta('Formato de email inválido.');
      return;
    }

    // Verificar que el campo de nombre no esté vacío
    if (!this.usuario.nombre) {
      this.mostrarAlerta('El campo de nombre no puede estar vacío.');
      return;
    }

    // Verificar que el campo de apellido no esté vacío
    if (!this.usuario.apellido) {
      this.mostrarAlerta('El campo de apellido no puede estar vacío.');
      return;
    }

    // Verificar que el campo de nombre de usuario no esté vacío
    if (!this.usuario.username) {
      this.mostrarAlerta('El campo de nombre de usuario no puede estar vacío.');
      return;
    }

    // Validar el formato del usuario
    if (this.usuario.username.length < 3 || this.usuario.username.length > 8) {
      this.mostrarAlerta('El usuario debe tener mínimo 3 y máximo 8 caracteres.');
      return;
    }

    // Verificar que el campo de contraseña no esté vacío
    if (!this.usuario.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacía.');
      return;
    }

    // Verificar que la contraseña tenga 4 caracteres
    if (this.usuario.password.length !== 4) {
      this.mostrarAlerta('La constraseña debe ser de 4 caracteres.');
      return;
    }

    // Verificar que al repetir la constraseña sea la misma
    if(this.usuario.password !== this.password2) {
      this.mostrarAlerta('La constraseña debe ser igual a la primera.');
      return;
    }

    // Verificar que el campo de fecha de nacimiento no esté vacío
    if (!this.usuario.nacimiento) {
      this.mostrarAlerta('El campo de fecha de nacimiento no puede estar vacía.');
      return;
    }
    
    this.guardarDatos();

    // Si todas las validaciones son correctas, navega a la página "home"
    this.router.navigate(['/home'], { state: { user: this.usuario.username } });
  }

  guardarDatos() {
    this.dbService.insertUsuario(this.usuario.username, this.usuario.password, this.usuario.nombre, this.usuario.apellido, this.usuario.email, this.usuario.nacimiento)
      .then(() => {
        this.mostrarAlerta('Datos guardados exitosamente');
        // Aquí puedes añadir lógica adicional, como mostrar un mensaje de éxito al usuario.
      })
      .catch(error => {
        this.mostrarAlerta('Error al guardar datos:' + error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
      });
  }

  limpiar(){
    for (var [key, value] of Object.entries(this.usuario)) {
      Object.defineProperty(this.usuario,key,{value:""})
    }
  }

  limpiar2() {
  this.usuario = {
    email: "",
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    nacimiento: ""
  };
  this.password2 = "";
}
}
