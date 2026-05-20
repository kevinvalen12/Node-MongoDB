import { StudentService } from './../services/student.service';;
export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    getStudent = async (res: Response, req: Request) => {
        try {
            const students = await this.studentService.getAll();
            res.json(students)
        } catch(error) {

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