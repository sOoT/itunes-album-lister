import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from '../../albums.service';
import { Artist } from 'src/app/models/artist.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ActivationStart, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/modules/shared/data-storage.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @ViewChild("artistFilter") artistFilter: ElementRef;
  artists: Artist[];
  artistsSubscription: Subscription;
  routerSubscription: Subscription;
  selectedArtist: number|null;

  constructor(
    private albumsService: AlbumsService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedArtist = null;
    this.routerSubscription = this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        this.selectedArtist = data.snapshot.params['artistId'];
        if (this.selectedArtist) {
          this.dataStorageService.fetchAlbumsByArtist(+this.selectedArtist).subscribe();
        }
      }
    });
    this.artistsSubscription = this.albumsService.artistsChanged.subscribe(
      () => {
        this.artists = this.albumsService.getArtists();
      }
    );
  }

  /**
   * @param {string} value 
   */
  onSelect(value: string) {
    this.router.navigate(['/albums/' + value]);
  }

  ngOnDestroy(): void {
    this.artistsSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
