import { 
  AfterViewInit,
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output, 
  ViewChild 
} from '@angular/core';
import { AlbumsService } from '../../../../shared/albums.service';
import { AlbumDetail } from 'src/app/models/album-detail.model';
import { Subscription } from 'rxjs';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { fadeIn } from 'src/app/animations/fadeIn';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  },
  animations: [fadeIn]
})
export class AlbumDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() public dialogOpened = new EventEmitter();
  private mutationObserver: MutationObserver;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  private albumDetailSubscription: Subscription;

  public state: 'open' | 'closed' = 'closed';
  public albumDetail: AlbumDetail = null;
  public faCircleXmark = faCircleXmark;

  constructor(
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.albumDetailSubscription = this.albumsService.albumDetailChanged.subscribe((albumDetail) => {
      this.albumDetail = albumDetail;
    });
  }

  ngAfterViewInit(): void {
    const dialog = this.dialog.nativeElement;
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
          this.state = this.dialog.nativeElement.open ? 'open' : 'closed';
        }
      });
    });

    this.mutationObserver.observe(dialog, {
      attributes: true
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
    this.mutationObserver.disconnect();
  }
}
