const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String
    }
    ,
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
      },
   
   
})

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;