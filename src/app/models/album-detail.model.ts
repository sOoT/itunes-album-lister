export class AlbumDetail {
  constructor(
      public id: number,
      public title: string,
      public artist: string,
      public year: number,
      public genre: string,
      public cover: string,
      public tracks: string[],
  ) {}
}