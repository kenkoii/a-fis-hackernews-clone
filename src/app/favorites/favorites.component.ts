import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    displayItems = [];
    currentIndex = 0;
    constructor(private favoritesService: FavoritesService) {
    }

    ngOnInit() {  
      this.getStories();
    }

    getStories() {
      this.displayItems = this.favoritesService.getFavorites();
    }

    onItemRemoved(id) {
      console.log("id" + id);
      this.displayItems = this.displayItems.filter(item => id != item);
    }
    
}
