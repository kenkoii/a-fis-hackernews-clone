import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Item } from '../models/item';
import { UtilityService } from '../utility.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})
export class CommentPageComponent implements OnInit, OnDestroy {

  id: number;
  item: Item;
  private sub: Subscription;
  constructor(private route: ActivatedRoute, private httpService: HttpService, private utilityService: UtilityService, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getItem(this.id);
   });
  }

  getItem(id) {
    this.httpService.getItem(id)
        .then(res => res.json())
        .then(obj => {
          this.item = obj;
          this.item.id = id;
        })
        .catch(err => console.log(err));
  }

  getHost(url) {
    return this.utilityService.getHost(url);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  getDateFromUnixTime(ticks: number) {
    return this.utilityService.getDateFromUnixTime(ticks);
  }

  isAlreadyFavorited(id) {
    return this.favoritesService.getFavorites().filter(item => item == id).length > 0;
  }

  copyUrl(url) {
    this.utilityService.copyUrl(url);
  }

  addToFavorites(id) {
    if(!this.isAlreadyFavorited(id)) {
      this.favoritesService.addFavorite(id);
      this.utilityService.toast({
        message: "Post Saved!",
        type: "is-info",
        dismissible: true
      });  
    } else {
      this.favoritesService.removeFavorite(id);
      this.utilityService.toast({
        message: "Post Removed!",
        type: "is-info",
        dismissible: true
      });
    }
    
  }

  getUserUrl(username) {
    return `https://news.ycombinator.com/user?id=${username}`;
  }

}
