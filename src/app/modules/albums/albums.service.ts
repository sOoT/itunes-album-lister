import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Album } from "../../models/album.model";
import { Result } from "src/app/interfaces/result.interface";
import { Artist } from "src/app/models/artist.model";

@Injectable({ providedIn: "root" })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  artistsChanged = new Subject<Artist[]>();
  albums: Album[] = [];
  artists: Artist[] = [];
  albumDetail: Album;
  selectedArtist: number;

  /**
   * Return albums list
   * @returns {Album[]}
   */
  getAlbums() {
    return this.albums.slice();
  }

  /**
   * Set albums list from response
   * @param {Result[]} response
   */
  setAlbums(response: Result[]) {
    this.albums = [];
    response.forEach((result: Result) => {
      if (result.wrapperType !== "collection") return;
      const releaseDate = new Date(result.releaseDate).getFullYear();
      const cover = result.artworkUrl100.replace("100x100", "600x600");
      const album = new Album(
        result.collectionId,
        result.collectionName,
        cover,
        result.artistId,
        result.artistName,
        result.primaryGenreName,
        releaseDate,
      )
      this.albums.push(album);
    });
    this.albumsChanged.next(this.albums.slice());
  }

  /**
   * Get artists list from albums
   * @returns {Artist[]}
   */
  getArtists() {
    return this.artists.slice();
  }

  /**
   * Set artists list from albums
   * @param {Result[]} response
   */
  setArtists(response: Result[]) {
    this.artists = [];
    response.forEach((result: Result) => {
      const artist = new Artist(result.artistId, result.artistName);
      if (this.artists.find(a => a.id === artist.id)) return;
      this.artists.push(artist);
    });
    this.artistsChanged.next(this.artists.slice());
  }

  /**
   * Set album details
   * @param {Result[]} response 
   */
  setAlbumDetails(response: Result[]) {
    response.forEach((result: Result) => {

    });
  }
}