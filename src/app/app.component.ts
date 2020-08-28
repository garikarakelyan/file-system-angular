import {Component, OnInit} from '@angular/core';
import items from "../assets/files/items.json";
import {Item} from "./core/models/item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private itemListJsonData: Item[] = [];
  private itemList: any = [];
  public currentItemsList: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.itemListJsonData = items.map(item => new Item(item))
    this.listToTree(this.itemListJsonData);
  }

  listToTree(list) {
    for (let i = 0; i < list.length; i++) {
      const currentPathData = list[i].path.split('/');
      list[i].parentId = (currentPathData.length > 1) ? currentPathData[currentPathData.length - 2] : null;
      if (!list[i].children?.length) {
        list[i].children = [];
      }
      if (list[i].parentId !== null) {
        for (let j = 0; j < list.length; j++) {
          const currentPathData = list[j].path.split('/');
          if (currentPathData.pop() === list[i].parentId) {
            if (!list[j].children?.length) {
              list[j].children = [];
            }
            list[j].children.push(list[i]);
          }
        }
      }
    }

    this.itemList = list;
    this.currentItemsList = this.itemList.filter(data => data.parentId === null);
  }

  onItemCLick(event: any) {
    this.currentItemsList = this.itemList.filter(data => data.path === event)[0].children;
  }

  setCurrentPath() {
    const pathArr = this.currentItemsList[0].path.split('/');
    return pathArr.slice(0, pathArr.length - 1).join('/');
  }

  onSearch(word) {
    if (word) {
      this.currentItemsList =  this.itemList.filter(data => data.path.includes(word))[0]?.children || [];
    } else {
      this.currentItemsList = this.itemList.filter(data => data.parentId === null);
    }
  }

  onBack(parent: string) {
    this.currentItemsList = this.itemList.filter(data => data.parentId === parent);
  }
}
