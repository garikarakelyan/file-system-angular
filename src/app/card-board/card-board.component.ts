import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../core/models/item";

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.scss']
})
export class CardBoardComponent implements OnInit {
  @Input('itemsList') itemsList: Item[];
  @Output() onPathClick = new EventEmitter<any>();
  public path: string;
  private sortedByName = false;
  private sortedByDate = false;
  private sortedByType = false;
  private sortedBySize = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFolderClick(item: any, event) {
    if (item.type === 'file') {
      event.preventDefault();
      return
    }
    this.onPathClick.emit(item.path);
  }

  onSortClick(type: string) {
    switch (type) {
      case 'byName' :
        if (this.sortedByName) {
          this.itemsList.reverse();
          this.sortedByName = false;
        } else {
          this.itemsList.sort((a, b) => a.path.localeCompare(b.path));
          this.sortedByName = true;
        }
        break;
        case 'byDate' :
          if (this.sortedByDate) {
            this.itemsList.reverse();
            this.sortedByDate = false;
          } else {
            this.itemsList.sort((a, b) => {
              return a.modificationDate.getTime() < b.modificationDate.getTime() ? -1 : 1;
            });
            this.sortedByDate = true;
          }
          break;
        case 'byType' :
          if (this.sortedByType) {
            this.itemsList.reverse();
            this.sortedByType = false;
          } else {
            this.itemsList.sort((a, b) => a.type.localeCompare(b.type));
            this.sortedByType = true;
          }
        break;
        case 'bySize' :
          if (this.sortedBySize) {
            this.itemsList.reverse();
            this.sortedBySize = false;
          } else {
            this.itemsList.sort((a, b) => {
               return b.size - a.size
            });
            this.sortedBySize = true;
          }
        break;
    }
  }

}
