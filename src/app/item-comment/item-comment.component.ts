import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Item } from 'src/app/models/item';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-item-comment',
  templateUrl: './item-comment.component.html',
  styleUrls: ['./item-comment.component.css']
})
export class ItemCommentComponent implements OnInit {
  @Input()
  itemId: number;
  item: Item;

  constructor(private httpService: HttpService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.httpService.getItem(this.itemId)
        .then(res => res.json())
        .then(obj => this.item = obj)
        .catch(err => console.log(err));
  }

  getDateFromUnixTime(ticks) {
    return this.utilityService.getDateFromUnixTime(ticks);
  }

}
