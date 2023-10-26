import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  @Input() showDetails: boolean;

  ngOnInit(): void {
    console.log(this.showDetails);
  }
}
