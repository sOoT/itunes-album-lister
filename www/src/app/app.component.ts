import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { LoaderOverlayService } from './modules/shared/loader-overlay.service';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'iTunes Album Lister';
  loading: boolean = false;

  constructor(
    private loaderOverlayService: LoaderOverlayService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loaderOverlayService.loading.subscribe((loading) => {
      this.loading = loading;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.document.body.classList.toggle('home', event.url === '/');
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
