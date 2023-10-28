export class Album {
  constructor(
    public id: number,
    public name: string,
    public cover: string,
    public artistId: number,
    public artistName: string,
    public genre: string,
    public releaseDate: number,
  ) {}
}