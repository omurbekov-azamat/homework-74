import express from 'express';

const app = express();
const port = 8000;

app.get('/messages', (req, res) => {
  res.send('all messages');
});

app.post('/messages', (req, res) => {
  res.send('create');
});

app.listen(port, () => {
  console.log('we are on live on ' + port);
});
