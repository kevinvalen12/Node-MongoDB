import { Logger } from "../middlewares/logger/logger.class";
import Student from "../models/student.model";
import { studentsData } from "./data/student.data";

export const studentSeeder = async (): Promise<void> => {
    try {
        await Student.deleteMany({});
        Logger.info('Colección students limpiada');

        await Student.insertMany(studentsData);
        Logger.info(`${studentsData.length} estudiantes insertados`);
    } catch (error) {
        Logger.error('error en student seeder', error)
        throw error;
    }
}