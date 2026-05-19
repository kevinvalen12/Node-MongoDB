import express, {Response, Request} from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (_req: Request, res: Response) => {
    res.send("holaaaaa")
});


app.listen(PORT, () => {
    console.log(`conexion exitasa al puerto ${PORT}`)
});