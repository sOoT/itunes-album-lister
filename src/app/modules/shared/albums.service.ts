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
  albums: Album[] = [];
  artists: Artist[] = [];
  albumDetail: AlbumDetail;
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

  getAlbumDetail() {
    return this.albumDetail;
  }

  /**
   * Set album details
   * @param {Result[]} response 
   */
  setAlbumDetail(response: Result[]) {
    const songs: Track[] = [];
    if (response.length < 2) {
      this.albumDetail = null;
      this.albumDetailChanged.next(this.albumDetail);
      return;
    };
    response.forEach((result: Result) => {
      if (result.kind !== "song") return;
      const releaseDate = new Date(result.releaseDate).getFullYear();
      const cover = result.artworkUrl100.replace("100x100", "600x600");
      const duration = new Date(result.trackTimeMillis);
      const durationFormatted = duration.toLocaleString("en-us", { minute: '2-digit', second: "2-digit"});
      songs.push(new Track(
        result.trackId,
        result.trackName,
        durationFormatted,
        result.trackNumber,
      ));
      songs.sort((a, b) => a.trackNumber - b.trackNumber);
      this.albumDetail = new AlbumDetail(
        result.collectionId,
        result.collectionName,
        result.artistName,
        releaseDate,
        result.primaryGenreName,
        cover,
        songs
      );
    });
    this.albumDetailChanged.next(this.albumDetail);
  }
}