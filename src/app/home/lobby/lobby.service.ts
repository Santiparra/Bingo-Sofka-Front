import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

    this.socket.on('lobbiesUpdate', (data: Lobby[]) => {
      this.lobbiesSubject.next(data);
    });
  }

  getLobbies(): Observable<Lobby[]> {
    return this.lobbiesSubject.asObservable();
  }

  createLobby() {
    this.socket.emit('createLobby', { id: 'asdasdasd', username: 'Santi', password: 'pass' });
  }

  joinLobby(lobbyId: string) {
    this.socket.emit('joinLobby', { lobbyId, player: { id: 'asdasdasd', username: 'Santi', password: 'pass' } });
  }
}
