import randomIntFactory from "./random-int-factory";

export default class ShuffleQueue<T> {
  items: T[];
  _previousItem?: T;
  _futureItems: T[];

  constructor(items: T[]) {
    if (items.length < 2) {
      throw new Error("you must have at least two items in the queue");
    }
    
    this.items = items;
    
    this._previousItem = null;
    this._futureItems = [...items];
  }
  
  pick = (): T => {
    let randomIndex: number, randomElement: T;
    
    const randomInt = randomIntFactory(this._futureItems.length - 1);
    const generateElement = () => {
      randomIndex = randomInt();
      randomElement = this._futureItems[randomIndex];
    }
    
    generateElement();
        
    while (randomElement === this._previousItem)
      generateElement();

    this._previousItem = this._futureItems.splice(randomIndex, 1)[0];
    
    if (!this._futureItems.length) {
      this._futureItems = [...this.items];
    }
    
    return randomElement;
  }
}
