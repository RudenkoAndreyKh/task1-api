import express from 'express';
import api from './api/index';
import bodyParser from 'body-parser';
const cors = require('cors');

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.setMiddlewares();
        this.setRoutes();
        // this.catchErrors();
    }

    private setMiddlewares(): void {
        this.express.use(cors());
        // this.express.use(morgan('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // this.express.use(helmet());
    }



    private setRoutes(): void {
        this.express.use('/api', api);
    }

}

export default new App().express;