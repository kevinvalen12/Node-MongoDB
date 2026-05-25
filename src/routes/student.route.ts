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
        this.router.get('/', this.studentController.getStudent);

        this.router.get('/:id', this.studentController.getStudentId);

        this.router.post('/', this.studentController.studentCreate);

        this.router.put('/:id', this.studentController.studentEdit);

        this.router.delete('/:id', this.studentController.studentDelete);
    }
}