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
    }
}