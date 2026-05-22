import express, {Response, Request} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { DATABASE } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (_req: Request, res: Response) => {
    res.send("holaaaaa")
});

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