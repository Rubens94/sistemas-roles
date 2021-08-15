const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const { dbConnection }     = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer( this.app );

        this.paths = {
            products:  '/api/products',
            auth:      '/api/',
            users:     '/api/users'
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        
        // Lectura y parseo del body (Importante poner para poder enviar la información por el request)
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.paths.products, require('../routes/products') );
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.users, require('../routes/users') );

    }


    listen() {
        // Se pone a escuchar el server debido a que 'app' es de express y no tiene sockets
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}


module.exports = Server;