import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Lobby, LobbyService } from '../home/lobby/lobby.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css',
})
export class GameboardComponent implements OnInit {
  lobbyId!: string | null;
  lobby$!: Observable<Lobby | undefined>;

  constructor(
    private lobbyService: LobbyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lobbyId = params['lobbyId'];
      if (this.lobbyId) {
        this.lobby$ = this.lobbyService.getLobby(this.lobbyId);
      }
    });
  }
}
