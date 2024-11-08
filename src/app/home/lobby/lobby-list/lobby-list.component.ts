import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { LobbyService, Lobby } from '../lobby.service';

@Component({
  selector: 'app-lobby-list',
  standalone: true,
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.css'],
  imports: [CommonModule],
})
export class LobbyListComponent implements OnInit {
  lobbies$!: Observable<Lobby[]>; 

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbies$ = this.lobbyService.getLobbies();
  }

  joinLobby(lobbyId: string) {
    this.lobbyService.joinLobby(lobbyId);
  }
}
