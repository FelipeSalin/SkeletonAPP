import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.scss'],
  standalone: true,
})
export class CompanyLogoComponent {

  constructor() { }
    @Input() companyLogo: string = "Mi empresa"; // Valor predeterminado
}
