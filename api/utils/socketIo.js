import {Server} from 'socket.io'

let connection = null

export class Socket {
    socket

    constructor(){
        this.socket = null
    }

    connect(server){
        const io = new Server(server)
        io.on('connection', (socket) => {
            this.socket = socket
        })
    }

    emit(event, data){
        this.socket.emit(event, data)
    }

    static init(server){
        if(!connection){
            connection = new Socket()
            connection.connect(server)
        }
    }

    static getConnection(){
        if(connection){
            return connection
        }
    }
}

export default {
    connect: Socket.init,
    connection: Socket.getConnection
}