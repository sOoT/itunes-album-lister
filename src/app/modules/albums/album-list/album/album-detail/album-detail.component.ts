import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AlbumsService } from '../../../../shared/albums.service';
import { AlbumDetail } from 'src/app/models/album-detail.model';
import { Subscription } from 'rxjs';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  
  private albumDetailSubscription: Subscription;
  albumDetail: AlbumDetail = null;
  faCircleXmark = faCircleXmark;

  constructor(
    private albumsService: AlbumsService
  ) { }

  ngOnInit(): void {
    this.albumDetailSubscription = this.albumsService.albumDetailChanged.subscribe((albumDetail) => {
      this.albumDetail = albumDetail;
    });
  }

  onClose() {
    this.dialog.nativeElement.close();
    this.albumsService.albumDetailChanged.next(null);
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  ngOnDestroy() {
    this.albumDetailSubscription.unsubscribe();
  }
}
