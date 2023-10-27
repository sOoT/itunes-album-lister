import { Component, OnInit } from '@angular/core';
import { LoaderOverlayService } from './modules/shared/loader-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'iTunes Album Lister';
  loading: boolean = false;

  constructor(private loaderOverlayService: LoaderOverlayService) {}

  ngOnInit(): void {
    this.loaderOverlayService.loading.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
