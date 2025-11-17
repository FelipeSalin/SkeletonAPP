import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false,
})
export class MapaPage implements OnInit {

  constructor(private route: ActivatedRoute, private menu: MenuController) { }

  ngOnInit() {
    this.menu.close("mainMenu");
  }

}
