const dotenv = require('dotenv'); // 설정파일
dotenv.config();
const express = require('express');
const app = express();
const connect = require('./schemas/');
const pageRouter = require('./routes/page');
// const {sequelize} = require('./models');
const nodemailer = require('nodemailer');
const cors = require('cors');
const morgan = require('morgan');
const port = 3000;
const router = express.Router();
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const companyRouter = require('./routes/company');
// const SocketIO = require('./socket');
// const { Server } = require('socket.io');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output');
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// SocketIO(server);
connect();


const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/seoul")
const createdAt = moment().format("HH:mm");
console.log("현재 시각은 "+createdAt + " 입니다.")


app.use(morgan('dev'));

app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api', [usersRouter, commentsRouter, postsRouter, companyRouter, socketRouter]);


app.get('/', (req, res) => {
  res.send('헬로 월드');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});
io.on('connection', (socket) => {
  // socket.send("hihi");

  socket.on('disconnect', () => {
    io.emit('send message', {
      message: `${socket.username} 님께서 채팅창을 떠났습니다. ${createdAt}`,
      user: '환영합니다',
    });
  });

  socket.on('new message', (msg) => {
    console.log(msg);
    io.emit('send message', { message: msg, user: socket.username });
  });

  socket.on('new user', (usr) => {
    socket.username = usr;
    io.emit('send message', {
      message: `${socket.username} 님이 채팅에 참여하셨습니다.`,
      user: 'Welcome!',
    });
  });
});


server.listen(port, () => {
  console.log(port, '포트가 켜졌습니다.');
});





