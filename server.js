import express from 'express';
import http from 'http'
import dotenv from 'dotenv';
import connectDB from './api/config/database.js';
import cors from 'cors'
import socket from './api/utils/socketIo.js'

import userRoutes from './api/routes/users.routes.js';
import houseRoutes from './api/routes/houses.routes.js';
import eventRoutes from './api/routes/events.routes.js';
import noticesRoutes from './api/routes/notices.routes.js';

import { notFound, errorHandler } from './api/middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send({"message": "Visistant registration API..."});
});

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notices", noticesRoutes);

//MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server running as ${process.env.MODE} in ${PORT}`))
//app.listen(PORT, console.log(`Server running as ${process.env.MODE} in ${PORT}`));

socket.connect(server)
