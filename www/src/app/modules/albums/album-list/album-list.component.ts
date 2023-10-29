import { Component, OnDestroy, OnInit } from '@angular/core';
import * as beatlesResults from '../../../data/beatles.json';
import { Result, Results } from 'src/app/interfaces/result.interface';
import { Album } from '../../../models/album.model';
import { AlbumsService } from '../../shared/albums.service';
import { ActivatedRoute, ActivationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { LocalStorageService } from '../../shared/local-storage';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  data: Results = beatlesResults;
  albums: Album[];
  albumId: number;
  subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private localStorageService: LocalStorageService,
    private albumsService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const artistId = this.localStorageService.getData('artistId');
    const searchTerm = this.localStorageService.getData('searchTerm');
    if (searchTerm) {
      this.dataStorageService.fetchAlbums(searchTerm).subscribe();
    } else if (artistId) {
      this.dataStorageService.fetchAlbumsByArtist(+artistId).subscribe();
    }
    this.subscription = this.albumsService.albumsChanged
      .subscribe((albums: Album[]) => {
        this.albums = albums;
      });      

     this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        this.albumId = data.snapshot.params['albumId'];
        if (this.albumId) {
          this.dataStorageService.fetchAlbumDetail(+this.albumId).subscribe();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
