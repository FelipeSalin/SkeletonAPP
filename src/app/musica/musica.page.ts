import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
  standalone: false,
})
export class MusicaPage implements OnInit {

  constructor(private route: ActivatedRoute, private menu: MenuController) { }

  ngOnInit() {
    this.menu.close("mainMenu");
  }

}
