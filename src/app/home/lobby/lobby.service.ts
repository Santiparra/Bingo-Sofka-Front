import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { AuthService } from '../../auth/auth.service';

export interface Lobby {
  id: string;
  players: any;
  state: 'open' | 'close';
  countdown: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private socket: Socket;
  private lobbiesSubject = new BehaviorSubject<Lobby[]>([]);
  userData: { id: string; username: string } | null = null;

  constructor(private authService: AuthService) {
    this.socket = io('http://localhost:3010');

    this.socket.on('lobbiesUpdate', (data: Lobby[]) => {
      this.lobbiesSubject.next(data);
    });
    this.loadUserData();
    console.log('User ID:', this.userData!.id);
    console.log('Username:', this.userData!.username);
  }

  getLobbies(): Observable<Lobby[]> {
    return this.lobbiesSubject.asObservable();
  }

  getLobby(lobbyId: string): Observable<Lobby | undefined> {
    return this.lobbiesSubject
      .asObservable()
      .pipe(
        map((lobbies: Lobby[]) => lobbies.find((lobby) => lobby.id === lobbyId))
      );
  }

  updateLobbiesList() {
    this.socket.emit('getLobbies');
  }

  createLobby() {
    this.socket.emit('createLobby', {
      id: this.userData!.id,
      username: this.userData!.username,
    });
  }

  joinLobby(lobbyId: string) {
    this.socket.emit('joinLobby', {
      lobbyId,
      player: { id: this.userData!.id, username: this.userData!.username },
    });
  }

  loadUserData(): void {
    this.userData = this.authService.getUserData();
    if (this.userData) {
      console.log('Username:', this.userData.username);
    } else {
      console.log('No user data found');
    }
  }
}
