
const socket = io();


socket.on('chatrooms', function(chatrooms) {
    console.log('recived chatrooms', chatrooms);

    const chatroomList = document.getElementById('chatroom-list');
    chatroomList.innerHTML = "";

    for(let chatroom of chatrooms){
        const listItem = document.createElement('li')
        listItem.innerText = chatroom.name;
        chatroomList.appendChild(listItem);
    }
   
})

socket.on('error', (err) => {
    console.log('error')
})

/*
// Make connection
const socket = io();


socket.on('chatrooms', function(chatrooms) {
    console.log('recived chatrooms', chatrooms);

    const chatroomList = document.getElementById('chatroom-list');
    chatroomList.innerHTML = "";

    for(let chatroom of chatrooms){
        const listItem = document.createElement('li')
        listItem.innerText = chatroom.name;
        chatroomList.appendChild(listItem);
    }
   
})

socket.on('error', (err) => {
    console.log('error')
})
*/