export class Project {
  id?: number;
  title: String;
  body: String;
  img: String;
  skillsUsed: String;
  gitHubLink: String;
  webPageLink: String;

  constructor(
    title: String, 
    body: String, 
    img: String, 
    skillsUsed: String, 
    gitHubLink: String, 
    webPageLink: String
  ) {
    this.title = title;
    this.body = body;
    this.img = img;
    this.skillsUsed = skillsUsed;
    this.gitHubLink = gitHubLink;
    this.webPageLink = webPageLink;
  }
}