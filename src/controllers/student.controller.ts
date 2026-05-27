import { Response, Request } from 'express';
import { StudentService } from '../services/student.service';
import { isValidObjectId } from 'mongoose';

/**
 * Controlador para gestionar las operaciones CRUD de estudiantes.
 * Maneja las peticiones HTTP y delega la lógica de negocio al StudentService.
 */
export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    /**
     * Obtiene una lista paginada de estudiantes.
     *
     * @route GET /students
     * @param {Request} req - Request de Express (query: page, limit)
     * @param {Response} res - Response de Express
     * @returns {Promise<Response>} Lista paginada de estudiantes o error.
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

    /**
     * Obtiene un estudiante por su ID.
     *
     * @route GET /students/:id
     * @param {Request} req - Request de Express (params: id)
     * @param {Response} res - Response de Express
     * @returns {Promise<Response>} Estudiante encontrado o error.
     */
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

    /**
     * Crea un nuevo estudiante.
     *
     * @route POST /students
     * @param {Request} req - Request de Express (body: datos del estudiante)
     * @param {Response} res - Response de Express
     * @returns {Promise<Response>} Estudiante creado o error.
     */
    studentCreate = async (req: Request, res: Response) => {
        try {
            const data = req.body;

            const id = await this.studentService.createStudent(data);
            return res.status(201).json({
                message: 'Estudiantes creado exitosamente',
                id
            });
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el servidor'
            return res.status(500).json({ message });
        }
    }

    /**
     * Edita un estudiante existente.
     *
     * @route PUT /students/:id
     * @param {Request} req - Request de Express (params: id, body: datos a editar)
     * @param {Response} res - Response de Express
     * @returns {Promise<Response>} Estudiante editado o error.
     */
    studentEdit = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            
            const id = req.params.id as string;
            if(!isValidObjectId(id)) return res.status(400).json({ message: 'El id no es válido' });

            const student = await this.studentService.editStudent(id, data);
            if(!student) return res.status(404).json({ message: 'Estudiantes no se encuentra' });
            console.log(student)
            return res.json(student);
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el servidor'
            return res.status(500).json({ message });
        }
    }

    /**
     * Elimina un estudiante por su ID.
     *
     * @route DELETE /students/:id
     * @param {Request} req - Request de Express (params: id)
     * @param {Response} res - Response de Express
     * @returns {Promise<Response>} Mensaje de éxito o error.
     */
    studentDelete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id)) return res.status(404).json({ message: 'El id no es válido' });

            const delectedStudent = await this.studentService.deleteStudent(id);
            if (!delectedStudent) return res.status(404).json({ message: 'Estudiantes no se encuentra' });

            return res.json({ message: 'Estudiante eliminado correctament' })
        } catch(error) {
            const message = error instanceof Error ? error.message : 'Error interno en el servidor'
            return res.status(500).json({ message });
        }
    }

}