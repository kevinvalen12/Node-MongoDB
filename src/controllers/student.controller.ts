import { Response, Request } from 'express';
import { StudentService } from '../services/student.service';  
export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    /**
     * Obtiene una lista paginada de estudiantes de forma asíncrona.
     * Extrae los parametros page y limit proporcionados en la url
     * Aplica valores pro de defecto sino proporcionados en la url
     */
    getStudent = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const students = await this.studentService.getAll(page, limit);
            return res.json(students)
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el Servido'
            return res.status(500).json({ message });
        }
    }

    getStudentId = async () => {

    }

    studentCreate = async () => {

    }

    studentEdit = async () => {

    }

    studentDelete = async () => {

    }

}