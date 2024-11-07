import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onStartGame() {
    throw new Error('Method not implemented.');
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
