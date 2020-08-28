export interface ItemOptions {
    path: string,
    modificationDate: Date,
    size?: number,
    type: string,
    parentId?: any
}

export class Item {
    path: string;
    modificationDate: Date;
    size?: number;
    type: string;
    parentId?: any


    constructor(item) {
      Object.keys(item).forEach(name => {
          if (name == 'modificationDate') {
              this[name] = new Date(item[name])
          } else {
              this[name] = item[name]
          }
      })
    }
}
