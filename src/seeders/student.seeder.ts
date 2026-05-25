import Student from "../models/student.model";
import { studentsData } from "../data/student.data";

export const studentSeeder = async (): Promise<void> => {
    try {
        await Student.deleteMany({});
        console.log('Colección students limpiada');

        await Student.insertMany(studentsData);
        console.log(`${studentsData.length} estudiantes insertados`);
    } catch(error) {
        console.error('error en student seeder', error);
        throw error;
    }
}