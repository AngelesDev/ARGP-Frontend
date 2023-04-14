export class About {
  id?: number;
  body: String;
  img: string;

  constructor(body: String, img: string) {
    this.body = body;
    this.img = img;
  }
}