// const express = require('express');
// const app = express();

// const { Server } = require('socket.io');
// // // console.log(Server)
// // const router = express.Router();
// module.exports = (server) => {
//   const io = new Server(server, {
//       cors: {
//           origin: '*',
//           methods: ['GET', 'POST'],
//       },
//       pingInterval: 10000,
//       pingTimeout: 5000,
//   });
// //   console.log(router);
// // // console.log(io)
// // const moment = require("moment");
// // require("moment-timezone");
// // moment.tz.setDefault("Asia/seoul")
// // const createdAt = moment().format("HH:mm");
// // console.log("현재 시각은 "+createdAt + " 입니다.")

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/chat.html');
// });

// io.on('connection', (socket) => {
//   socket.on('disconnect', () => {
//     io.emit('send message', {
//       message: `${socket.username} 님께서 채팅창을 떠났습니다. ${createdAt}`,
//       user: '환영합니다',
//     });
//   });

//   socket.on('new message', (msg) => {
//     console.log(msg);
//     io.emit('send message', { message: msg, user: socket.username });
//   });

//   socket.on('new user', (usr) => {
//     socket.username = usr;
//     io.emit('send message', {
//       message: `${socket.username} 님이 채팅에 참여하셨습니다.`,
//       user: '(',
//     });
//   });
// });

// }