import express, {Application, Request, Response} from 'express';
import dotenv from "dotenv";
import Compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mainrouter from './router/mainRouter';
import Middleware from './middleware/Middleware';

//  initialize dotenv file
dotenv.config();

//  server configuration
const port = 1991;

//  initialize express
const expressApp: Application = express();
expressApp
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(Compression())
.use(cors({ origin: '*' }))
.use(helmet())
.use(`/api/example`, Middleware, mainrouter)
.get('/', (req: Request, res: Response) => res.sendStatus(403))
.listen(port, () => {
    console.log(`PORT=${port};\nENV=${process.env.NODE_ENV};\nRUNNING=${new Date().toDateString()};`)
})
.on('error', error => {
    console.log(error)
});