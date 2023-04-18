

const http = require('http');
const express = require('express');
const socket = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://krifors:LKWsNIAMvoOC5Jeq@duckchat.blafzko.mongodb.net/?retryWrites=true&w=majority";
const Chatroom = require('./models/chatroom');

const app = express();

const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://krifors:LKWsNIAMvoOC5Jeq@duckchat.blafzko.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongo connection open!");
  })
  .catch((err) => {
    console.log("oh no mongo connection error!!");
    console.log(err);
  });

const server = app.listen(3000, function(){
  console.log('listening for requests on port 3000,');
});

const io = require('socket.io')(server);

// Static files
app.use(express.static('views'));

io.on('connection', async (socket) => {
    console.log('A user connected');
  
    // Fetch all chatrooms and emit to the client
    try {
      const chatrooms = await Chatroom.find({});
      console.log(chatrooms);
      socket.emit('chatrooms', chatrooms);
    } catch (err) {
      console.error('An error occurred while fetching chatrooms:', err);
      socket.emit('error', 'An error occurred while fetching chatrooms');
    }

  // Create a change stream on the chatroom collection
  const changeStream = Chatroom.watch();

  // Listen for changes in the chatroom collection
  changeStream.on('change', async (change) => {
    console.log('A change occurred:', change);

    // When a change occurs, fetch the updated chatrooms and emit to the client
    try {
      const chatrooms = await Chatroom.find({});
      console.log(chatrooms);
      socket.emit('chatrooms', chatrooms);
    } catch (err) {
      console.error('An error occurred while fetching chatrooms:', err);
      socket.emit('error', 'An error occurred while fetching chatrooms');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



