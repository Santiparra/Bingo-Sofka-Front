import { Component } from '@angular/core';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LobbyListComponent } from './lobby/lobby-list/lobby-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, LobbyListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
