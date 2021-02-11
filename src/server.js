const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Bla');
});

io.on('connection', socket => {
    console.log(`User connected ${socket.id}`);
    
    socket.on('entered_room', roomId => {
        console.log(`${socket.id} entered room ${roomId}`);
        
        socket.on('left_room', () => {
            console.log(`${socket.id} left room ${roomId}`);
        });

        socket.emit('video_data', {
            time: Date.now(),
            url: 'https://www.youtube.com/watch?v=_2_Mt7K1V3E'
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(8888, () => {
    console.log('Listening on http://localhost:8888');
});