import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.findTop().subscribe((res) => {
      console.log(res);
    });
  }
}
