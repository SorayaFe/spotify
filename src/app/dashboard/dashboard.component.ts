import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  range = new FormControl<'medium_term' | 'short_term' | 'long_term'>(
    'short_term',
    { nonNullable: true }
  );

  tracks: any[] = [];

  private readonly destroy = new Subject<void>();

  constructor(private readonly spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getData(this.range.value);

    this.range.valueChanges.pipe(takeUntil(this.destroy)).subscribe((v) => {
      this.getData(v);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getData(range: 'medium_term' | 'short_term' | 'long_term'): void {
    this.spotifyService
      .findTop({ type: 'tracks', limit: 10, time_range: range })
      .subscribe((res) => {
        this.tracks = res.items;
      });
  }
}
