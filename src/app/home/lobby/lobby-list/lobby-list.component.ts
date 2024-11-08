import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { LobbyService, Lobby } from '../lobby.service';

// TODO: Fix lobbies subscription
@Component({
  selector: 'app-lobby-list',
  standalone: true,
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.css'],
  imports: [CommonModule, AsyncPipe],
})
export class LobbyListComponent implements OnInit {
  lobbies$!: Observable<Lobby[]>; 

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbyService.updateLobbiesList();
    this.lobbies$ = this.lobbyService.getLobbies();
  }

  joinLobby(lobbyId: string) {
    this.lobbyService.joinLobby(lobbyId);
  }
}
