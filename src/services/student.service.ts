import { StudentInterface } from "../interfaces/student.interface";
import Student from "../models/student.model";

interface PaginatedResult {
    data: StudentInterface[],
    total: number,
    page: number,
    totalPages: number,
}

export class StudentService {

    /**
     * 
     * @param page // posición de la página en la que se encuentra el usuario
     * @param limit // limite la cantidad maxima de registros por pagina
     * @returns 
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult> {
        // calcula cunatos documentos saltarse
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            Student.find()
                .select('-__v') // se excluye este campo interno de mongosee
                .sort({ createdAt: -1 }) // lista los mas recientes primero
                .skip(skip) // salta los registros de la pagina anterio 
                .limit(limit), // limita los datos por pagina
            Student.countDocuments()
        ]);
        
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    // async getId(): Promise<StudentInterface> {

    // }

    // async createStudent(): Promise<StudentInterface> {

    // }

    async editStudent() {

    }

    async deleteStudent() {

    }
}