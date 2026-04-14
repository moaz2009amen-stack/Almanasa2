import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: env.clientOrigin }
});

io.on('connection', (socket) => {
  socket.on('forum:join', (courseId) => socket.join(`course:${courseId}`));
  socket.on('forum:newPost', ({ courseId, payload }) => io.to(`course:${courseId}`).emit('forum:postCreated', payload));
});

connectDb()
  .then(() => {
    server.listen(env.port, () => {
      console.log(`API listening on :${env.port}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
