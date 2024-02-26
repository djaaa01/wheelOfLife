import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  email: string;
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.getCurrentUse()?.email as string;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
