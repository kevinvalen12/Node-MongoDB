import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DATABASE } from '../config/db';
import { studentSeeder } from './student.seeder';
import { Logger } from '../middlewares/logger/logger.class';

dotenv.config();

const runSeeders = async (): Promise<void> => {
    try {
        const db = DATABASE.getInstance();
        await db.connect();
        Logger.info('Iniciando seeders');

        await studentSeeder();
    } catch(error) {
        Logger.error('Se produjo un error en el proceso', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        Logger.info('conexion cerrada');
        process.exit(0);
    }
}

runSeeders();