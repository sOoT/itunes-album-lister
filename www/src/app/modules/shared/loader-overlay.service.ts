import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderOverlayService {
  private _loading$ = new Subject<boolean>();
  public loading = this._loading$.asObservable();

  constructor() {}

  setLoadingStatus(status: boolean) {
    this._loading$.next(status);
  }
}