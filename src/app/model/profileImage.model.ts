export class ProfileImage {
  id?: number;
  name: String;
  type: String;
  imageData: String;

  constructor(name: String, imageData: String, type: String) {
    this.name = name;
    this.imageData = imageData;
    this.type = type;
  }
}