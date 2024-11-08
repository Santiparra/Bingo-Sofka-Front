import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LobbyService } from '../lobby/lobby.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private lobbyService: LobbyService
  ) {}

  createNewLobby() {
    this.lobbyService.createLobby();
  }

  onStartGame() {
    throw new Error('Method not implemented.');
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
