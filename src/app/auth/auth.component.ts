import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  data = undefined;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');

      this.authService.authenticate(code).subscribe((res) => {
        if (typeof res === 'string') {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
