import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Dbservice } from '../dbservice';

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
      this.mostrarAlerta('Credenciales inválidas');
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
