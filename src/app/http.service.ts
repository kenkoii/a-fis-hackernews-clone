import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = "https://hacker-news.firebaseio.com/v0/";
  itemBaseUrl: string = this.baseUrl + "item/";
  extensionUrl: string = ".json?print=pretty";

  constructor() { }

  private get(url: string): Promise<Response> {
    return fetch(url);
  }

  getItem(itemId: number): Promise<Response> {
    return this.get(this.itemBaseUrl + itemId + this.extensionUrl);
  }

  getList(listName: string): Promise<Response> {
    return this.get(this.baseUrl + listName + this.extensionUrl);
  }
}
