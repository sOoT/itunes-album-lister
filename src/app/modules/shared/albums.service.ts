import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Album } from "../../models/album.model";
import { Result } from "src/app/interfaces/result.interface";
import { Artist } from "src/app/models/artist.model";
import { AlbumDetail } from "src/app/models/album-detail.model";
import { Track } from "src/app/models/track.model";

@Injectable({ providedIn: "root" })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  artistsChanged = new Subject<Artist[]>();
  albumDetailChanged = new Subject<AlbumDetail>();
  _albums: Album[] = [];
  _artists: Artist[] = [];
  _albumDetail: AlbumDetail;
  _selectedArtist: number;

  /**
   * Return albums list
   * @returns {Album[]}
   */
  getAlbums(): Album[] {
    return this._albums.slice();
  }

  /**
   * Set albums list from response
   * @param {Result[]} response
   */
  setAlbums(response: Result[]) {
    if (!response.length) return;
    this._albums = [];
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
      this._albums.push(album);
    });
    this.albumsChanged.next(this._albums.slice());
  }

  /**
   * Get artists list from albums
   * @returns {Artist[]}
   */
  getArtists() {
    return this._artists.slice();
  }

  /**
   * Set artists list from albums
   * @param {Result[]} response
   */
  setArtists(response: Result[]) {
    this._artists = [];
    response.forEach((result: Result) => {
      const artist = new Artist(result.artistId, result.artistName);
      if (this._artists.find(a => a.id === artist.id)) return;
      this._artists.push(artist);
    });
    this.artistsChanged.next(this._artists.slice());
  }

  getAlbumDetail() {
    return this._albumDetail;
  }

  /**
   * Set album details
   * @param {Result[]} response 
   */
  setAlbumDetail(response: Result[]) {
    if (!response.length) return;
    const isResponseHasSongs = response.some((result: Result) => result.kind === "song");
    const songs: Track[] = [];
    response.forEach((result: Result) => {
      if (isResponseHasSongs && result.kind !== "song") {
        return;
      };
      if (isResponseHasSongs) {
        songs.push(new Track(
          result.trackId,
          result.trackName,
          new Date(result.trackTimeMillis).toLocaleString("en-us", { minute: '2-digit', second: "2-digit"}),
          result.trackNumber,
        ));
        songs.sort((a, b) => a.trackNumber - b.trackNumber);
      }
      this._albumDetail = new AlbumDetail(
        result.collectionId,
        result.collectionName,
        result.artistName,
        new Date(result.releaseDate).getFullYear(),
        result.primaryGenreName,
        result.artworkUrl100.replace("100x100", "600x600"),
        songs
      );
    });
    this.albumDetailChanged.next(this._albumDetail);
  }
}