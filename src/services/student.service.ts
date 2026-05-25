import { Types } from 'mongoose';
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
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult | null> {
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

        const totalPages = Math.ceil(total / limit)
        if (page > totalPages && total > 0) return null
        
        return {
            data,
            total,
            page,
            totalPages
        };
    }

    async getId(id: string): Promise<StudentInterface | null> {
        return await Student.findById(new Types.ObjectId(id)).select('-__v');
    }

    async createStudent(body: StudentInterface) {
        return await Student.create(body);
    }

    async editStudent(id: string, body: StudentInterface): Promise<StudentInterface | null> {
        const studentId = new Types.ObjectId(id);
        const studentUpdate = await Student.findByIdAndUpdate(
            studentId, 
            { $set: body}, // evita sobreescribir capos no enviados usando
            { after: true, runValidators: true }
        );
    
        return studentUpdate;
    }

    async deleteStudent() {

    }
}