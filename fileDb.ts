import fs from 'fs';
import {GotMessageWithDate} from "./types";

const directoryName = './messages/';
let arr: GotMessageWithDate[] = [];

const fileDb = {
  async init() {
    try {
      await fs.readdir(directoryName, (err, data) => {
        if (err) {
          console.log('Error!', err);
        }
        let lastFive = data.slice(-5);
        arr = [];

        lastFive.forEach(async (file) => {
          await fs.readFile((directoryName + file), (err, data) => {
            arr.push(JSON.parse(data.toString()));
          });
        });
      });
    } catch (err) {
      console.log('Error has occurred', err);
    }
  },
  async getItems() {
    return arr.sort((a, b) => b.date > a.date ? 1 : -1);
  },
  async addItem(element: GotMessageWithDate) {
    try {
      await fs.writeFile(directoryName + element.date + '.txt', JSON.stringify(element), (err) => {
        if (err) {
          console.log('Error!', err)
        }
      });
      await this.init();
      return element;
    } catch (err) {
      console.log('Error has occurred!', err);
    }
  },
};

export default fileDb;