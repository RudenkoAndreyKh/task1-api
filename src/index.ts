import express, {Application, Response, Request, NextFunction, Router} from 'express';
import app from './App';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/work', {useNewUrlParser: true});

// const app: Application = express();

// var router:Router = express.Router();

// router.get('/', (req:Request, res:Response, next: NextFunction) => {
//     res.status(200).send({ message: "hello" });
// })

const port: number = 4000;

// app.use('/api', router);

let allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', 'PUT');
    next();
}
app.use(allowCrossDomain);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})