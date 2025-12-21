import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Dbservice } from 'src/app/services/dbService/dbservice';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {

  usuario?: Usuario;

  constructor(private route: ActivatedRoute, 
              private menu: MenuController,
              private dbService: Dbservice) {}

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  ionViewWillEnter() {
    const idUsuarioLogueado = 1; // aquí va el ID real del login
    this.dbService.obtenerUsuario(idUsuarioLogueado).then(user => {
      if (user) {
        this.usuario = user;
      }
    });
  }
}
