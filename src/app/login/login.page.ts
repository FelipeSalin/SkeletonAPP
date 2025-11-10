import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

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
  user={
    usuario:"",
    password:""
  }
  constructor(private router: Router, private navCtrl: NavController, private alertController: AlertController) { } // Se debe instanciar

  // Método para mostrar alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Función para validar el formato usuario
  validarEmail(usuario: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar email
    return emailRegex.test(usuario);
  }

  login() {
    // Verificar que el campo de correo no esté vacío
    if (!this.user.usuario) {
      this.mostrarAlerta('El campo de usuario no puede estar vacío.');
      return;
    }

    // Validar el formato del usuario
    if (this.user.usuario.length < 3 || this.user.usuario.length > 8) {
      this.mostrarAlerta('El usuario debe tener mínimo 3 y máximo 8 caracteres.');
      return;
    }

    // Verificar que el campo de correo no esté vacío
    if (!this.user.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacía.');
      return;
    }

    // Verificar que la contraseña tenga 4 caracteres
    if (this.user.password.length !== 4) {
      this.mostrarAlerta('La constraseña debe ser de 4 caracteres.');
      return;
    }

    // Si todas las validaciones son correctas, navega a la página "home"
    this.router.navigate(['/home'], { state: { user: this.user.usuario } });
  }

  registro()
  {
    this.navCtrl.navigateForward(['/registro']);
  }

  ingresar(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
  }
}
