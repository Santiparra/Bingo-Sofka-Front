import { Component, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';

@Component({
  selector: 'app-lobby-list',
  standalone: true,
  imports: [],
  templateUrl: './lobby-list.component.html',
  styleUrl: './lobby-list.component.css'
})
export class LobbyListComponent implements OnInit {
  lobbies: any[] = [];
  lobby: any = null;
  message = '';
  countdown = 0;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbyService.lobbiesUpdate$.subscribe((lobbies) => {
      this.lobbies = lobbies;
    });

    this.lobbyService.lobbyCreated$.subscribe((lobby) => {
      this.lobby = lobby;
      this.startCountdown(lobby.countdown);
    });

    this.lobbyService.joinedLobby$.subscribe((lobby) => {
      this.lobby = lobby;
      this.startCountdown(lobby.countdown);
    });

    this.lobbyService.lobbyNotFound$.subscribe(() => {
      this.message = 'Lobby no encontrado o ya en curso.';
    });
  }

  createLobby() {
    this.lobbyService.createLobby({ name: 'Jugador' });
  }

  joinLobby(lobbyId: string) {
    this.lobbyService.joinLobby(lobbyId, { name: 'Jugador' });
  }

  startCountdown(seconds: number) {
    this.countdown = seconds;
    const interval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) clearInterval(interval);
    }, 1000);
  }
}
