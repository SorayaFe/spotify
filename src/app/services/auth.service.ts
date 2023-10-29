import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EncodingService } from './encoding.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly encoding: EncodingService) {}

  private token: string | null = null;

  getToken(): string | null {
    this.token = localStorage.getItem('token');

    return this.token;
  }

  authenticate(code: string | null): Observable<string | null> {
    const token = localStorage.getItem('token');

    if (token) {
      this.token = token;
      return of(token);
    } else if (code) {
      return this.setToken(code);
    } else {
      const codeVerifier = this.encoding.generateRandomString(128);

      this.encoding
        .generateCodeChallenge(codeVerifier)
        .then((codeChallenge) => {
          const state = this.encoding.generateRandomString(16);
          const scope = 'user-read-private user-read-email user-top-read';

          localStorage.setItem('code_verifier', codeVerifier);

          const args = new URLSearchParams({
            response_type: 'code',
            client_id: '18429e18c3a4478983abb3db36bcf590',
            scope: scope,
            redirect_uri: 'http://localhost:4200/auth',
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
          });

          window.location.href =
            'https://accounts.spotify.com/authorize?' + args;
        });

      return of(null);
    }
  }

  setToken(code: string): Observable<string> {
    const codeVerifier = localStorage.getItem('code_verifier') ?? '';

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:4200/auth',
      client_id: '18429e18c3a4478983abb3db36bcf590',
      code_verifier: codeVerifier,
    });

    return new Observable((observer) => {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }

          return response.json();
        })
        .then((data) => {
          localStorage.setItem('token', data.access_token);
          this.token = data.access_token;

          observer.next(data.access_token);
          observer.complete();
        })
        .catch((err) => {
          console.error('Error:', err);
          observer.error(err);
        });
    });
  }
}
