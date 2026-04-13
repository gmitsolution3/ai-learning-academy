export class SidebarUrl {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  define(url: string) {
    return url === "/" ? this.baseUrl : this.baseUrl.concat(url);
  }
}