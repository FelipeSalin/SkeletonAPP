import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicaPageRoutingModule } from './musica-routing.module';
import { CompanyLogoComponent } from '../company-logo/company-logo.component';

import { MusicaPage } from './musica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicaPageRoutingModule,
    CompanyLogoComponent,
  ],
  declarations: [MusicaPage]
})
export class MusicaPageModule {}
