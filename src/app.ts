import express, {Response, Request} from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import { DATABASE } from "./config/db";
import { StudentRouter } from "./routes/student.route"

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const studentRouter = new StudentRouter();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (_req: Request, res: Response) => {
    res.send("holaaaaa")
});

app.use('/api/v1/students', studentRouter.router);

const startServer = async () => {
    try {
        const db = DATABASE.getInstance();
        await db.connect();

        app.listen(PORT, () => {
            console.log(`conexion exitasa al puerto ${PORT}`)
        });
    } catch(error) {
        console.error('error al conectar mongo', error);
        process.exit(1);
    }
}

startServer();