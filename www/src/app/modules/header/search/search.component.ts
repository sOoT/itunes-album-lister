import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { ActivationStart, Router } from '@angular/router';
import { AlbumsService } from '../../shared/albums.service';
import { Artist } from 'src/app/models/artist.model';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../shared/local-storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchForm: FormGroup;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('resultsEl', { static: false }) resultsEl: ElementRef<HTMLDivElement>;
  private debounceTimeout: ReturnType<typeof setTimeout>;
  private routerSubscription: Subscription;
  private albumsSubscription: Subscription;
  private artistsSubscription: Subscription;
  public artists: Artist[] = [];
  public searchOpen: boolean = false;
  public selectedArtist: number|null = null;

  constructor(
    private elemenRef: ElementRef,
    private dataStorageService: DataStorageService,
    private localStorageService: LocalStorageService,
    private albumsService: AlbumsService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  /**
   * When the user clicks outside of the search component, 
   * we want to close the autocomplete results.
   * 
   * @param {MouseEvent} event
   */
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.elemenRef.nativeElement.contains(event.target)) {
      this.searchOpen = false;
    } 
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        this.selectedArtist = data.snapshot.params['artistId'];
        if (this.selectedArtist) {
          this.dataStorageService.fetchAlbumsByArtist(+this.selectedArtist).subscribe();
        }
      }
    });

    this.artistsSubscription = this.albumsService.artistsChanged.subscribe((artists) => {
      this.artists = artists;
      if (this.artists?.length && this.value.length) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  /**
   * When the user submits the form,
   * we want to navigate to the albums page and fetch the albums.
   * 
   * @returns {void}
   */
  onSubmit(): void {
    this.router.navigate(['/albums']);
    this.albumsSubscription = this.dataStorageService.fetchAlbums(this.value).subscribe();
    this.localStorageService.saveData('searchTerm', this.value);
    this.localStorageService.removeData('artistId');
    this.close();
  }

  /**
   * When the user clicks on the input field, 
   * we want to show the autocomplete results.
   * 
   * @returns {void}
   */
  onFocus(): void {
    const searchTerm = this.value;

    if (!searchTerm) {
      this.localStorageService.removeData('searchTerm');
      this.artists = [];
      return;
    }

    this.onInput();
  }
  
  /**
   * To give the user a chance to type before making the request,
   * we use a debounce.
   * 
   * @returns {void}
   */
  onInput(): void {
    if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
    }

    const searchTerm = this.value;
    if (!searchTerm.length) {
      this.artists = [];
      this.localStorageService.removeData('searchTerm');
      this.close(true);
      return;
    }

    this.debounceTimeout = setTimeout(() => {
      this.dataStorageService.fetchArtists(this.value).subscribe();
    }, 300);
  }
  /**
   * Prevent the cursor from moving when the user presses the up or down arrow keys.
   * 
   * @param {KeyboardEvent} event 
   */
  onKeyDown(event: KeyboardEvent): void {
    if (
        event.code === 'ArrowUp' ||
        event.code === 'ArrowDown' ||
        event.code === 'Enter'
    ) {
      event.preventDefault();
    }

    if (event.code === 'Escape') {
      this.close(true);
    }
  }

  /**
   * Handle keyboard events for autocomplete
   * 
   * @param {KeyboardEvent} event 
   */
  onKeyUp(event: KeyboardEvent): void {
    if (!this.value) {
        this.close(true);
    }
    switch (event.code) {
        case 'ArrowUp':
            this.switchOption('up')
            break;
        case 'ArrowDown':
            this.switchOption('down');
            break;
        case 'Enter':
            this.selectOption();
            break;
    }
    event.preventDefault();
  }

  /**
   * Handle click events for autocomplete
   * @param {MouseEvent} event 
   */
  onSearchItemClick(event: MouseEvent): void {
    const allElements = this.resultsEl.nativeElement.querySelectorAll('li');
    allElements.forEach((element) => {
      this.renderer.setAttribute(element, 'aria-selected', 'false');
    });
    this.renderer.setAttribute(event.currentTarget, 'aria-selected', 'true');
    this.localStorageService.removeData('searchTerm');
    this.selectOption();
  }

  /**
   * Open the autocomplete results
   */
  open() {
    this.renderer.setStyle(this.resultsEl.nativeElement, 'max-height', this.getResultsMaxHeight() + 'px');
    this.renderer.setAttribute(this.searchInput.nativeElement, 'aria-expanded', 'true');
    this.searchOpen = true;
  }

  /**
   * Close the autocomplete results
   * 
   * @param {boolean} clearSearchTerm 
   */
  close(clearSearchTerm: boolean = false) {
    if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
    }
    this.searchOpen = false;
    if (clearSearchTerm) {
      this.searchForm.reset();
    } else {
      this.searchInput.nativeElement.blur();
    }
  }

  /**
   * Calculate the max height of the autocomplete results
   * 
   * @returns {number}
   */
  getResultsMaxHeight(): number {
    return window.innerHeight - this.searchInput.nativeElement.getBoundingClientRect().bottom - 20;
  }

  /**
   * Switch between autocomplete options
   * 
   * @param {string} direction 
   * @returns {void}
   */
  switchOption(direction: string): void {
    if (!this.searchOpen) return;

    const moveUp = direction === 'up';
    const allElements = this.resultsEl.nativeElement.querySelectorAll('li');
    const selectedElement = this.resultsEl.nativeElement.querySelector('[aria-selected="true"]');
    let activeElement: Element = this.resultsEl.nativeElement.querySelector('li');

    if (moveUp && !selectedElement) return;

    if (!moveUp && selectedElement) {
        activeElement = selectedElement.nextElementSibling || allElements[0];
    } else if (moveUp) {
        activeElement = selectedElement.previousElementSibling || allElements[allElements.length - 1];
    }

    if (activeElement === selectedElement) return;

    this.renderer.setAttribute(activeElement, 'aria-selected', 'true');
    if (selectedElement) this.renderer.setAttribute(selectedElement, 'aria-selected', 'false');

    this.renderer.setAttribute(this.searchInput.nativeElement, 'aria-activedescendant', activeElement.id);
  }
  
  /**
   * Select an option
   */
  selectOption(): void {
    const selectedElement = this.resultsEl.nativeElement.querySelector('[aria-selected="true"]');
    const artistId = selectedElement?.getAttribute('data-value');

    if (selectedElement) {
      this.dataStorageService.fetchAlbumsByArtist(+artistId).subscribe();
      this.localStorageService.saveData('artistId', artistId);
      this.router.navigate(['/albums/' + artistId]);
      this.close(true);
    } else {
      this.onSubmit();
    }
  }

  get value(): string {
    return this.searchForm.value.search;
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.albumsSubscription?.unsubscribe();
    this.artistsSubscription?.unsubscribe();
  }
}
