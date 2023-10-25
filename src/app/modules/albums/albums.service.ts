import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Album } from "../../models/album.model";
import { Result } from "src/app/interfaces/result.interface";
import { Artist } from "src/app/models/artist.model";

@Injectable({ providedIn: "root" })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  artistsChanged = new Subject<string[]>();
  albums: Album[] = [];
  artists: Artist[] = [];

  getAlbums() {
    return this.albums.slice();
  }

  setAlbums(response: Result[]) {
    this.artists = [];
    this.albums = [];
    response.forEach((result: Result) => {
      if (result.wrapperType !== "collection") return;
      const releaseDate = new Date(result.releaseDate);
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
      this.setArtists(album);
    });
    this.albumsChanged.next(this.albums.slice());
  }

  getArtists() {
    return this.artists.filter((artist, index, self) => {
      return self.findIndex(t => t.id === artist.id) === index;
    }).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  setArtists(album: Album) {
    this.artists.push(new Artist(album.artistId, album.artistName));
  }
}