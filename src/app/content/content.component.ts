import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  items = [];
  displayItems = [];
  currentIndex = 0;
  filterSize = 10;
  pages = 0;
  selected = 'topstories';
  constructor(private httpService: HttpService) {
  }

  ngOnInit() {  
    this.getStories(this.selected);
  }

  getStories(selected) {
    this.httpService.getList(selected)
    .then(res => res.json())
    .then(obj => {
      this.items = obj;
      this.getCurrentItems();
    })
    .catch(err => console.log(err));
  }

  getCurrentItems() {
    const start = this.currentIndex * 10;
    this.displayItems = this.items.slice(start, start + this.filterSize);
  }

  getTotalPages() {
    return Math.ceil(this.items.length/10);
  }

  onClickNext() {
    this.currentIndex++;
    //TODO: Reload?
    this.getCurrentItems();
  }

  onClickPrevious() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.getCurrentItems();
  }

  onClickFilter(filter) {
    this.selected = filter;
    this.currentIndex = 0;
    this.getStories(this.selected);
  }

  isFirst() {
    return this.currentIndex == 0?'hidden':'visible';
  }
}
