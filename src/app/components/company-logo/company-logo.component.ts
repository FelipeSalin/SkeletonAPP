import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.scss'],
  standalone: false,
})
export class CompanyLogoComponent {

  constructor() { }
    @Input() companyLogo: string = "Mi empresa"; // Valor predeterminado
}
