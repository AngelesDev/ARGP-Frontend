export class Experience {
  id?: number;
  title: String;
  body: String;

  constructor(title: String, body: String) {
    this.title = title;
    this.body = body;
  }
}