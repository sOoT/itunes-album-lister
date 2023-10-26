import { Component, Input, OnInit, Output } from '@angular/core';
import { Album } from '../../../../models/album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  @Output() showDetails = false;
  
  ngOnInit(): void {

  }

  onClick() {
    this.showDetails = !this.showDetails;
  }
}
