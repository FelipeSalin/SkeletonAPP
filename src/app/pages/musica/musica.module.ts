import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicaPageRoutingModule } from './musica-routing.module';
import { CompanyLogoComponent } from '../../components/company-logo/company-logo.component';

import { MatSliderModule } from '@angular/material/slider';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MusicaPage } from './musica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicaPageRoutingModule,
    CompanyLogoComponent,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [MusicaPage]
})
export class MusicaPageModule {}
