import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DATABASE } from '../config/db';
import { studentSeeder } from './student.seeder';

dotenv.config();

const runSeeders = async (): Promise<void> => {
    try {
        const db = DATABASE.getInstance();
        await db.connect();
        console.log('inciando seeders');

        await studentSeeder();
    } catch(error) {
        console.error(error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('conexion cerrada')
        process.exit(0);
    }
}

runSeeders();