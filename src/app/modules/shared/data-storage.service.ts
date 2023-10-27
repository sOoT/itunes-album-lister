import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Results } from 'src/app/interfaces/result.interface';

import { AlbumsService } from './albums.service';
import { LoaderOverlayService } from './loader-overlay.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  private config = {
      headers:  {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
      }
  };

  constructor(
    private http: HttpClient,
    private albumsService: AlbumsService,
    private loaderOverlayService: LoaderOverlayService
  ) {}

  fetchAlbums(term: string) {
    this.loaderOverlayService.loadingStatus = true;
    return this.http.get<Results>(
        `https://itunes.apple.com/search?term=${term}&entity=album`,
        this.config
      )
      .pipe(
        map(responseData => {
          return responseData.results;
        }),
        tap(responseData => {
          this.albumsService.setAlbums(responseData);
          this.albumsService.setArtists(responseData);
          this.loaderOverlayService.loadingStatus = false;
        })
      );
  }

  fetchAlbumsByArtist(artistId: number) {
    this.loaderOverlayService.loadingStatus = true;
    return this.http.get<Results>(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album`,
      this.config
    )
      .pipe(
        map(responseData => {
          return responseData.results;
        }),
        tap(results => {
          this.albumsService.setAlbums(results);
          this.loaderOverlayService.loadingStatus = false;
        })
      );
  }

  fetchAlbumDetail(albumId: number) {
    return this.http.get<Results>(
      `https://itunes.apple.com/lookup?id=${albumId}&entity=song`,
      this.config
    )
      .pipe(
        map(responseData => {
          return responseData.results;
        }),
        tap(results => {
          this.albumsService.setAlbumDetail(results);
        })
      );
  }
}