import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface Lobby {
  id: string;
  playerCount: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private socket: Socket;
  private lobbiesSubject = new Subject<Lobby[]>();

  constructor() {
    this.socket = io('http://localhost:3010');

    this.socket.on('lobbies', (data: unknown) => {
      if (Array.isArray(data)) {
        this.lobbiesSubject.next(data as Lobby[]);
      }
    });
  }

  getLobbies(): Observable<Lobby[]> {
    return this.lobbiesSubject.asObservable();
  }

  createLobby() {
    this.socket.emit('createLobby');
  }

  joinLobby(lobbyId: string) {
    this.socket.emit('joinLobby', lobbyId);
  }
}
