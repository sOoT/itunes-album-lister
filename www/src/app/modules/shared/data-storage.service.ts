import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Results } from 'src/app/interfaces/result.interface';

import { AlbumsService } from './albums.service';
import { LoaderOverlayService } from './loader-overlay.service';
import { Observable } from 'rxjs';

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

  /**
   * @param { String } term 
   * @returns { Observable<Results[]> }
   */
  fetchAlbums(term: string) {
    this.loaderOverlayService.setLoadingStatus(true);
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
          // this.albumsService.setArtists(responseData);
          this.loaderOverlayService.setLoadingStatus(false);
        })
      );
  }

  /**
   * @param { String } term 
   * @returns { Observable<Results[]> }
   */
  fetchArtists(term: string) {
    this.loaderOverlayService.setLoadingStatus(true);
    return this.http.get<Results>(
        `https://itunes.apple.com/search?term=${term}&entity=album`,
        this.config
      )
      .pipe(
        map(responseData => {
          return responseData.results;
        }),
        tap(responseData => {
          this.albumsService.setArtists(responseData);
          this.loaderOverlayService.setLoadingStatus(false);
        })
      );
  }

  /**
   * @param { number } artistId 
   * @returns { Observable<Results[]> }
   */
  fetchAlbumsByArtist(artistId: number) {
    this.loaderOverlayService.setLoadingStatus(true);
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
          this.loaderOverlayService.setLoadingStatus(false);
        })
      );
  }

  /**
   * @param { number } albumId 
   * @returns { Observable<Results[]> }
   */
  fetchAlbumDetail(albumId: number) {
    this.loaderOverlayService.setLoadingStatus(true);
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
          this.loaderOverlayService.setLoadingStatus(false);
        })
      );
  }
}