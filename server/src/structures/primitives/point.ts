export class Point {
  x: number;

  y: number;

  data: any;

  constructor(
    x: number,
    y: number,
    data: any = null,
  ) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}
