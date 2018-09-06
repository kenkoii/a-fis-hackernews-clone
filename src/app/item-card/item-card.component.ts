import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { Item } from '../models/item';
import { toast } from "bulma-toast";
import { FavoritesService } from '../favorites.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Output() itemRemoved = new EventEmitter<any>();

  @Input()
  itemId: number;
  isShowLoader: boolean;
  item: Item;
  constructor(private httpService: HttpService, 
              private favoritesService: FavoritesService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    console.log(this.itemId);
    this.isShowLoader = true;
    this.httpService.getItem(this.itemId)
                    .then(res => {
                      console.log(res); 
                      return res.json();
                    })
                    .then(obj => {
                      console.log(obj)
                      this.item = obj;
                      this.isShowLoader = false;
                    })
                    .catch(err => {
                      console.log(err);
                      this.isShowLoader = false;
                    });
  }

  getDateFromUnixTime(ticks: number) {
    return this.utilityService.getDateFromUnixTime(ticks);
  }

  //TODO: transfer methods to Model

  getHost(url: string) {
    return this.utilityService.getHost(url);
  }

  getUrl(item: Object) {
    if (item != undefined) {
      return item['url'];
    }
    return "";
  }

  getUserUrl(username) {
    return `https://news.ycombinator.com/user?id=${username}`;
  }

  copyUrl(url) {
    this.utilityService.copyUrl(url);
  }

  addToFavorites(id) {
    if(!this.isAlreadyFavorited(id)) {
      this.favoritesService.addFavorite(id);
      toast({
        message: "Post Saved!",
        type: "is-info",
        dismissible: true
      });  
    } else {
      this.favoritesService.removeFavorite(id);
      this.itemRemoved.emit(id);
      toast({
        message: "Post Removed!",
        type: "is-info",
        dismissible: true
      });
    }
    
  }

  isAlreadyFavorited(id) {
    return this.favoritesService.getFavorites().filter(item => item == id).length > 0;
  }

  getHackerNewsUrl(id) {
    return `https://news.ycombinator.com/item?id=${id}`;
  }

}
