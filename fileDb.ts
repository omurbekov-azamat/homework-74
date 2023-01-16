import fs from 'fs';
import {GotMessageWithDate} from "./types";

const directoryName = './messages/';
let arr: GotMessageWithDate[] = [];

const fileDb = {
  init() {
    fs.readdir(directoryName, (err, data) => {
      if (err) {
        console.log('Error!', err);
      }
      let lastFive = data.slice(-5);
      arr = [];

      lastFive.forEach(async (file) => {
        await fs.readFile((directoryName + file), (err, data) => {
          arr.push(JSON.parse(data.toString()));
        })
      });
    });
  },
  getItems() {
    this.init();
    return arr.sort((a, b) => b.date > a.date ? 1 : -1);
  },
  addItem(element: GotMessageWithDate) {
    try {
      fs.writeFile(directoryName + element.date + '.txt', JSON.stringify(element), (err) => {
        if (err) {
          console.log('Error!', err)
        }
      });
      return element;
    } catch (err) {
      console.log('Error has occurred!', err);
    }
  },
};

export default fileDb;