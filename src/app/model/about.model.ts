export class About {
  id?: number;
  body: String;
  img: String;

  constructor(body: String, img: String) {
    this.body = body;
    this.img = img;
  }
}