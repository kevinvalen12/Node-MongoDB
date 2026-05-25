import { Response, Request } from 'express';
import { StudentService } from '../services/student.service';
import { isValidObjectId } from 'mongoose';
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

            const page = Math.max(1, Number(req.query.page ?? 1));
            const limit = Math.max(1, Math.min(100, Number(req.query.limit ?? 1)));
            
            const students = await this.studentService.getAll(page, limit);
            if (!students) return res.status(404).json({ message: 'Has superado el limite de paginas' });
            
            return res.json(students);
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el servidor'
            return res.status(500).json({ message });
        }
    }

    getStudentId = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id)) return res.status(400).json({ message: 'El id no es válido' });

            const studentData = await this.studentService.getId(id);
            if (!studentData) return res.status(404).json({ message: `el id del estudiantes no se encuentra: ${id}` });
        
            return res.json(studentData);
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el servidor'
            return res.status(500).json({ message });
        }
    }

    studentCreate = async (req: Request, res: Response) => {
        try {
            const body = req.body;

            const id = await this.studentService.createStudent(body);
            return res.status(201).json({
                message: 'Estudiantes creado exitosamente',
                id
            });
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el servidor'
            return res.status(500).json({ message });
        }
    }

    studentEdit = async () => {
        
    }

    studentDelete = async () => {

    }

}