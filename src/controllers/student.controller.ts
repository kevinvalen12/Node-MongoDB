import { Response, Request, NextFunction } from 'express';
import { StudentService } from '../services/student.service';
import { isValidObjectId } from 'mongoose';
import { AppError } from '../middlewares/errros/error.middleware';

/**
 * Controlador para gestionar las operaciones CRUD de estudiantes.
 * Maneja las peticiones HTTP y delega la lógica de negocio al StudentService.
 */
export class StudentController {
    // inyeccion de dependencia 
    constructor(private studentService: StudentService) {}

    /**
     * Obtiene una lista paginada de estudiantes.
     *
     * @route GET /students
     * @param {Request} req - Request de Express (query: page, limit)
     * @param {Response} res - Response de Express
     * @returns {Promise<Response>} Lista paginada de estudiantes o error.
     */
    getStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const page = Math.max(1, Number(req.query.page ?? 1));
            const limit = Math.max(1, Math.min(100, Number(req.query.limit ?? 1)));
            
            const students = await this.studentService.getAll(page, limit);
            if (!students) throw new AppError('Has superado el limite de paginas', 404);
            
            return res.json(students);
        } catch(error) {
            return next(error);
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
    getStudentId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id)) throw new AppError('El id no es válido', 400);

            const studentData = await this.studentService.getId(id);
            if (!studentData) throw new AppError('Estudiantes no se encuentra', 404)
        
            return res.json(studentData);
        } catch(error) {
            return next(error);
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
    studentCreate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            const id = await this.studentService.createStudent(data);
            return res.status(201).json({
                message: 'Estudiantes creado exitosamente',
                id
            });
        } catch(error) {
            return next(error);
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
    studentEdit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            
            const id = req.params.id as string;
            if (!isValidObjectId(id)) throw new AppError('El id no es válido', 400);

            const student = await this.studentService.editStudent(id, data);
            if (!student) throw new AppError('Estudiantes no se encuentra', 404);
            console.log(student)
            return res.json(student);
        } catch(error) {
            return next(error);
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
    studentDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            if (!isValidObjectId(id)) throw new AppError('El id no es valido', 400);

            const delectedStudent = await this.studentService.deleteStudent(id);
            if (!delectedStudent) throw new AppError('El estudiante no se encuentra', 404)

            return res.json({ message: 'Estudiante eliminado correctament' })
        } catch(error) {
            return next(error);
        }
    }

}