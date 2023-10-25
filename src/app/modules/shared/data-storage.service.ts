import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Results } from 'src/app/interfaces/result.interface';

import { AlbumsService } from '../albums/albums.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private albumsService: AlbumsService
  ) {}

  fetchAlbums(term: string) {
    return this.http.get<Results>(
      // `https://itunes.apple.com/search?term=tool&entity=album`
        `https://itunes.apple.com/search?term=${term}&entity=album`
      )
      .pipe(
        map(responseData => {
          return responseData.results;
        }),
        tap(responseData => {
          console.log(responseData)
          this.albumsService.setAlbums(responseData);
        })
      );
  }

  fetchAlbumsByArtist(artistId: number) {
    return this.http.get<Results>(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album`
    )
      .pipe(
        map(responseData => {
          return responseData.results;
        }),
        tap(results => {
          this.albumsService.setAlbums(results);
        })
      );
  }
}