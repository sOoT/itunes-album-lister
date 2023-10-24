import { Component, OnInit } from '@angular/core';
import * as beatlesResults from '../../../data/beatles.json';
import { Result, Results } from 'src/app/interfaces/result';
import { Album } from '../album.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  data: Results = beatlesResults;
  albums: Album[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.albums = this.data.results.map((result: Result) => {
      const artworkUrl600 = result.artworkUrl100.replace('100x100', '600x600');
      return new Album(result.collectionName, artworkUrl600, result.artistName, result.primaryGenreName, result.releaseDate);
    });
  }

}
