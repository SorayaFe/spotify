import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private readonly http: HttpClient) {}

  findMe(): Observable<any> {
    return this.http.get<any>(`${SpotifyService.BASE_URL}/me`);
  }

  findTop(): Observable<any> {
    return this.http.get<any>(`${SpotifyService.BASE_URL}/me/top/tracks`);
  }
}
