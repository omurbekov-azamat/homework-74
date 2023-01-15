import {promises as fs} from 'fs';
import {GotMessageWithDate} from "./types";

const directoryName = './messages/';

const fileDb = {
  async addItem (element: GotMessageWithDate) {
    try {
      await fs.writeFile( directoryName + element.date + '.txt', JSON.stringify(element));
      return element;
    } catch (err) {
      console.log('Error has occurred!', err);
    }
  },
};

export default fileDb;