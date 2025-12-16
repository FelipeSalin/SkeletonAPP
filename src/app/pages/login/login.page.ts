import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Dbservice } from '../../services/dbService/dbservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */

  constructor(private router: Router, 
              private navCtrl: NavController, 
              private alertController: AlertController,
              private dbService: Dbservice) { } // Se debe instanciar

  usuario: any="";
  password: string="";

  // Método para mostrar alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async login() {
    // Verificar que el campo de correo no esté vacío
    if (!this.usuario) {
     this.mostrarAlerta('El campo de usuario no puede estar vacío.');
     return;
   }

    // Verificar que el usuario tenga entre 3 a 8 carácteres
    if ((this.usuario.length < 3) || (this.usuario.length > 8)) {
      this.mostrarAlerta('El nombre de usuario debe tener entre 3 a 8 carácteres.');
      return;
    }

    // Verificar que la contraseña no esté vacía
    if (!this.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
      return;
    }

    // Verificar que la contraseña tenga 4 carácteres
    if (this.password.length != 4) {
      this.mostrarAlerta('La contraseña debe tener 4 carácteres.');
      return;
    }

    const usuario = await this.dbService.validarUsuario(this.usuario, this.password);
    if (usuario) {

      localStorage.setItem('usuarioActivo', 'true');
      // Usuario válido, realizar acciones de inicio de sesión
      let NavigationExtras: NavigationExtras = {
        state:{
          usuarioEnviado: this.usuario,
          passwordEnviado: this.password
        }
      }
      this.router.navigate(['/home'],NavigationExtras);
    } else {
      // Usuario inválido, mostrar mensaje de error
      this.mostrarAlerta('Nombre de usuario o contraseña incorrectos.');
    }
  }

  registro()
  {
    this.navCtrl.navigateForward(['/registro']);
  }

  ingresar(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
  }
}
