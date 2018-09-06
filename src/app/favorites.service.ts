import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites = [];
  constructor() {
    const val = localStorage.getItem('favorites');
    if (val != null) {
      this.favorites = JSON.parse(val);
    } else {
      this.saveFavorites();
    }
  }

  getFavorites() {
    return this.favorites;
  }

  addFavorite(number) {
    this.favorites.unshift(number);
    this.saveFavorites();
  }

  removeFavorite(number) {
    this.favorites = this.favorites.filter(id => id != number);
    this.saveFavorites();
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  
  
}
