import { StudentDto, StudentUpdateSchema } from '../schemas/student.schema';
import { Types } from 'mongoose';
import { StudentInterface } from "../interfaces/student.interface";
import Student from "../models/student.model";

interface PaginatedResult {
    data: StudentInterface[],
    total: number,
    page: number,
    totalPages: number,
}


/**
 * Servicio para operaciones CRUD sobre estudiantes.
 * Incluye paginación, búsqueda por ID, creación, edición y eliminación.
 */
export class StudentService {

    /**
     * Obtiene una lista paginada de estudiantes.
     *
     * @param {number} [page=1] - Página actual (por defecto 1).
     * @param {number} [limit=10] - Cantidad máxima de registros por página (por defecto 10).
     * @returns {Promise<PaginatedResult|null>} Resultados paginados o null si la página no existe.
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

    /**
     * Obtiene un estudiante por su ID.
     *
     * @param {string} id - ID del estudiante a buscar.
     * @returns {Promise<StudentInterface|null>} El estudiante encontrado o null si no existe.
     */
    async getId(id: string): Promise<StudentInterface | null> {
        return await Student.findById(new Types.ObjectId(id)).select('-__v');
    }

    /**
     * Crea un nuevo estudiante en la base de datos.
     *
     * @param {StudentDto} data - Datos del estudiante a crear.
     * @returns {Promise<StudentInterface>} El estudiante creado.
     */
    async createStudent(data: StudentDto): Promise<StudentInterface> {
        return await Student.create(data);
    }

    /**
     * Edita un estudiante existente.
     *
     * @param {string} id - ID del estudiante a editar.
     * @param {typeof StudentUpdateSchema} body - Datos a actualizar (campos parciales).
     * @returns {Promise<StudentInterface|null>} El estudiante actualizado o null si no existe.
     */
    async editStudent(id: string, body: typeof StudentUpdateSchema): Promise<StudentInterface | null> {
        const studentId = new Types.ObjectId(id);
        const studentUpdate = await Student.findByIdAndUpdate(
            studentId, 
            { $set: body}, // evita sobreescribir capos no enviados usando
            { 
                returnDocument: 'after',
                runValidators: true
            }
        ).select('-__v, -id');
    
        return studentUpdate;
    }

    /**
     * Elimina un estudiante por su ID.
     *
     * @param {string} id - ID del estudiante a eliminar.
     * @returns {Promise<any>} Resultado de la operación de borrado.
     */
    async deleteStudent(id: string) {
        const studentId = new Types.ObjectId(id);
        const studentDeleted = await Student.deleteOne({ _id: studentId });

        return studentDeleted;
    }
}