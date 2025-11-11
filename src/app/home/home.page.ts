import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  usuario: string = '';
  email: string = '';
  password: string = '';
  fechaNacimiento: Date | null = null;
  niveles:any[]=[
    {id:1,nivel:"Basica Incompleta"},
    {id:2,nivel:"Basica Completa"},
    {id:3,nivel:"Media Incompleta"},
    {id:4,nivel:"Media Completa"},
    {id:5,nivel:"Media Incompleta"},
    {id:6,nivel:"Superior Completa"}
  ]
  data:any={
    nombre:"",
    apellido:"",
    education:"",
    nacimiento:""
  };
  constructor(public alertController: AlertController, private router: Router, private route: ActivatedRoute, private menu: MenuController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state['user'] || '';
      console.log('Usuario recibido:', this.usuario);
    }
  }

  ngOnInit() {

      this.menu.close("mainMenu");
      
      // Obtener los parámetros de la URL
      this.route.queryParams.subscribe(params => {
        this.email = params['email'];
        this.password = params['password'];
      });
    }

  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */
  limpiar(){
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  mostrar(){
    (this.data.nombre!="" && this.data.apellido!="") && 
    this.presentAlert("Usuario","Su nombre es "+this.data.nombre+" "+this.data.apellido);
  }

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}











/** Importaciones de librerías a usar *

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Archivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
  standalone: false,
})
export class HomePage {
  data: any; // Generamos una variable Any (permite cualquier valor)

  /**
   * En el constructor del HomePage se colocan por parametros
   * todas aquellas propiedades con el siguiente formato
   * private = visibilidad
   * activeRoute = identificador
   * ActiveRoute = Tipo de objeto
   * : indica que el identificador sera de la clase posterior a los : puntos
   * 
   *
  constructor(private activeroute: ActivatedRoute, private router: Router) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una suscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation()?.extras.state) { // Validamos que en la navegacion actual tenga extras
        this.data = this.router.getCurrentNavigation()!.extras.state!['user']; // Si tiene extra rescata lo enviado
        console.log(this.data) // Muestra por consola lo traido
        }else{this.router.navigate(["/login"])} // Si no tiene extra la navegacion actual navegar al login
    });
  }
}
*/

//@Component({
  //selector: 'app-pipes',
  //template: '<p>{{hoy}}</p>',
  //styleUrls: ['./pipes.component.css']
//})
//export class PipesComponent {

  //hoy = new Date();
  //constructor() { }
//}

//<p>{{hoy | date}}</p>