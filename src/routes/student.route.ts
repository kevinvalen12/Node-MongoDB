import { StudentSchema, StudentUpdateSchema } from '../schemas/student.schema';
import { validateData } from '../middlewares/errros/validate.middlewares';
import { StudentController } from './../controllers/student.controller';
import { Router } from "express";

    
export class StudentRouter {
    public router: Router;
    private studentController: StudentController;

    constructor() {
        this.router = Router();
        this.studentController = new StudentController;
        this.configurecion();
    }

    private configurecion(): void {
        /**
         * Configura las rutas disponibles para estudiantes:
         * - GET /        → Lista todos los estudiantes
         * - GET /:id     → Obtiene un estudiante por ID
         * - POST /       → Crea un estudiante (valida body)
         * - PUT /:id     → Edita un estudiante (valida body)
         * - DELETE /:id  → Elimina un estudiante
         *
         * Usa middlewares de validación para POST y PUT.
         */
        this.router.get('/', this.studentController.getStudent);
        this.router.get('/:id', this.studentController.getStudentId);
        //implementacion de validacion en datos ingresados en body 
        this.router.post('/',  validateData(StudentSchema), this.studentController.studentCreate);
        this.router.put('/:id', validateData(StudentUpdateSchema), this.studentController.studentEdit);
        this.router.delete('/:id', this.studentController.studentDelete);
    }
}

