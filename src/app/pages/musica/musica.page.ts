import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Dbservice } from 'src/app/services/dbService/dbservice';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
  standalone: false,
})
export class MusicaPage implements OnInit {

  usuarioRecibido: string='';
  passwordRecibido: string='';

  /*usuario: string = '';
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
  };*/
  constructor(private alertController: AlertController, 
              private router: Router, 
              private activateroute: ActivatedRoute, 
              private menu: MenuController,
              private dbService: Dbservice) {
    this.activateroute.queryParams.subscribe( params =>{
      if(this.router.getCurrentNavigation()?.extras?.state){

        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
        this.passwordRecibido = this.router.getCurrentNavigation()?.extras?.state?.['passwordEnviado'];

      }
    })
    /*const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state['user'] || '';
      console.log('Usuario recibido:', this.usuario);
    }*/
  }

  ngOnInit() {

      this.menu.close("mainMenu");

    }

  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */
  /*limpiar(){
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data,key,{value:""})
    }
  }*/

  /*mostrar(){
    (this.data.nombre!="" && this.data.apellido!="") && 
    this.presentAlert("Usuario","Su nombre es "+this.data.nombre+" "+this.data.apellido);
  }*/

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}