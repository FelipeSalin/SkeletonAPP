import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

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

  async getLocationAndShowOnMap() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Mostrar coordenadas en el mapa
      const mapFrame: any = document.getElementById('mapFrame');
      mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
    } catch (error) {
      console.error('Error al obtemer la ubicación:', error);
    }
  }
}
