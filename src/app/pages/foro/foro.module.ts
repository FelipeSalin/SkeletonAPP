import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoPageRoutingModule } from './foro-routing.module';
import { CompanyLogoComponent } from '../../components/company-logo/company-logo.component';

import { ForoPage } from './foro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoPageRoutingModule,
    CompanyLogoComponent,
  ],
  declarations: [ForoPage]
})
export class ForoPageModule {}
