import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { Logger } from "../middlewares/logger/logger.class";

dotenv.config();

export class DATABASE {
    private static instance: DATABASE;
    private connection!: typeof mongoose;

    constructor() {
        this.setupEventListeners();
    }

    public static getInstance(): DATABASE {
        if(!DATABASE.instance) {
            DATABASE.instance = new DATABASE();
        }
        return DATABASE.instance;
    }

    public async connect(): Promise<typeof mongoose> {
        if (mongoose.connection.readyState === 1) {
            Logger.info('Reutilizando la conexión existente a MongoDB.')
            return this.connection;
        }

        const url = process.env.MONGO_URL;
        if (!url) {
            Logger.error('MONGO_URl no esta bien definada en variables de entorno')
            throw new Error('MONGO_URl no esta bien definada en variables de entorno');
        } 

        const options: ConnectOptions = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        }

        try {
            Logger.info('Creando una nueva conexión a MongoDB...');
            this.connection = await mongoose.connect(url, options);
            return this.connection;
        } catch(error) {
            Logger.error('Error al conectar a MongoDB:', error);
            throw error
        }
    }

    private setupEventListeners(): void {
        mongoose.connection.on('connected', () => Logger.info('MongoDB: Conectado con éxito.'));
        mongoose.connection.on('error', (err) => Logger.error('MongoDB: Error de conexión:', err));
        mongoose.connection.on('disconnected', () => Logger.warn('MongoDB: Desconectado.'));
        mongoose.connection.on('reconnected', () => Logger.info('MongoDB: Reconectando.'))
    }
}