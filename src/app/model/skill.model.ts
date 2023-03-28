export class Skill {
  id?: number;
  name: String;
  level: String;

  constructor(name: String, level: String) {
    this.name = name;
    this.level = level;
  }
}