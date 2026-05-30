import { StudentService } from './services/student.service';
import express, {Response, Request} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import { DATABASE } from "./config/db";
import { StudentRouter } from "./routes/student.route"
import rateLimit from "express-rate-limit";
import { Logger } from './middlewares/logger/logger.class';
import { StudentController } from "./controllers/student.controller";
import { errorHandler } from './middlewares/errros/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
// limitar la cantidad de peticiones
const limomador = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limomador)
// protege contrata vulnerabilidades
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const studentService = new StudentService();
const studentController = new StudentController(studentService);
const studentRouter = new StudentRouter(studentController);
app.get('/', (_req: Request, res: Response) => {
    res.send("holaaaaa")
});

app.use('/api/v1/students', studentRouter.router);

app.use(errorHandler)

const startServer = async () => {
    try {
        const db = DATABASE.getInstance();
        await db.connect();

        app.listen(PORT, () => {
            Logger.info(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch(error) {
        Logger.error('error al conectar mongo', error);
        process.exit(1);
    }
}

startServer();