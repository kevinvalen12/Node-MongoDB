import { Document, Schema, model } from "mongoose";
import { StudentInterface } from "../interfaces/student.interface";


export interface StudentDocument extends StudentInterface, Document {
    createdAt: Date
    updatedAt: Date
}

const studentSchema = new Schema<StudentDocument>(
    {
        fullName: {}
    }
);

const Student = model<StudentDocument>('Srudent', studentSchema);

export default Student;