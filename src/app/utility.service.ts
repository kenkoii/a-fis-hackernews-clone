import { Injectable } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { toast } from "bulma-toast";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private favoritesService: FavoritesService) { }

  getDateFromUnixTime(ticks: number) {
    const time = new Date(ticks * 1000);
    return time;
  }

  getHost(url: string) {
    if (url != "" && url != null) {
      return new URL(url).host;  
    }
    return url;
  }

  copyUrl(url) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    // Set its ID
    dummy.setAttribute("id", "dummy_id");
    dummy.setAttribute("value", url);
    // Select it
    dummy.select();
    // Copy its contents
    document.execCommand("copy");
    // Remove it as its not needed anymore
    document.body.removeChild(dummy);
    this.toast({
      message: "Copied to clipboard!",
      type: "is-info",
      dismissible: true
    });
  }

  isAlreadyFavorited(id) {
    return this.favoritesService.getFavorites().filter(item => item == id).length > 0;
  }

  toast(obj) {
    toast(obj);
  }
}
