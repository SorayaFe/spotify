import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindTop } from '../models/find-top';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private readonly http: HttpClient) {}

  findMe(): Observable<any> {
    return this.http.get<any>(`${SpotifyService.BASE_URL}/me`);
  }

  findTop(dto: FindTop): Observable<any> {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(dto)) {
      if (value && key !== 'type') {
        params = params.append(key, value);
      }
    }

    return this.http.get<any>(`${SpotifyService.BASE_URL}/me/top/${dto.type}`, {
      params,
    });
  }
}
