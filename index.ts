import express from 'express';
import fileDb from "./fileDb";
import {GotMessageWithDate} from "./types";

const app = express();
const port = 8000;

app.use(express.json());

app.get('/messages', (req, res) => {
  res.send('all messages');
});

app.post('/messages', async (req, res) => {
  const message: GotMessageWithDate = {
    message: req.body.message,
    date: new Date().toISOString(),
  };

  const newMessage = await fileDb.addItem(message);

  res.send(newMessage);
});


const run = async () => {

  app.listen(port, () => {
    console.log('we are on live on ' + port);
  });
};

run().catch(console.error);