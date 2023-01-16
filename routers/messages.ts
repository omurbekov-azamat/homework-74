import express from "express";
import fileDb from "../fileDb";
import {GotMessageWithDate} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  const messageData: GotMessageWithDate = {
    message: req.body.message,
    date: new Date().toISOString(),
  };

  const saveMessage = await fileDb.addItem(messageData);
  res.send(saveMessage);
});

export default messagesRouter;