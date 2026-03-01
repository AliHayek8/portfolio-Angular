import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AppBarModule, ButtonsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}

