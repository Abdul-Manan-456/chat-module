

global.onlineUsers = new Map();
global.groups = new Map();
global.connectedUsers = new Map();
module.exports.socketServer = (io) => {
  global.IO = io;
  io.on("connection", socket => {
    socket.on('addUser', (data) => {
      onlineUsers.set(data?.userId, socket.id)
      console.log(data, '----------->', onlineUsers)
      io.emit("userOnline", data?.userId);
    });

    socket.on('createGroup', (data) => {
      groups.set(data.groupName, socket.id);
      socket.broadcast.emit("notification", `${data.groupName} join this group`);
       console.log(groups)

    });
  
    socket.on('sendTyping', (data) => {
      if (data.typing == true)
        socket.to(onlineUsers.get(`${data?.userId}`)).emit("typing", data);
      else
        socket.to(onlineUsers.get(`${data?.userId}`)).emit("typing", data);

    })

  
    socket.on('sendAudio', (data) => {
      socket.to(onlineUsers.get(`${data?.userId}`)).emit("audio", data.audioData);
      console.log('It in the buffer format', data.audioData)
    });


    socket.on('joinRoom', (data) => {
      const roomName = data?.roomName;
      socket.join(roomName);
      connectedUsers.set(socket.id, { roomName });
    });
    
    socket.on('disconnect', () => {
      if (connectedUsers.has(socket.id)) {
        const user = connectedUsers.get(socket.id);
        console.log(`Room ====> ${user}`);
    
      }
      const userId = Array.from(onlineUsers.entries()).find(([key, value]) => value === socket.id)?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        console.log('disconnect user ', userId)
        io.emit('userOffline', userId);
      }
    });
  });
};

















//       socket.on("message", (data) => {
//         console.log(onlineUsers.get(`${data.userId}`))
//         socket.to(onlineUsers.get(`${data.userId}`)).emit("privateMessage", data.userId , data.msg);
// })

