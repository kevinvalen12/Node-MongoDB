import { Document, Schema, model } from "mongoose";
import { DOCUMENT_TYPES, GENDER, STATUS, StudentInterface } from "../interfaces/student.interface";


export interface StudentDocument extends StudentInterface, Document {
    createdAt: Date
    updatedAt: Date,
    age: number | null
}

const studentSchema = new Schema<StudentDocument>(
    {
        fullName: {
            type: String,
            required: [true, 'el nombre es obligatorio'],
            minlength: [3, 'el nombre debe de tener minimo 3 caracteres'],
            match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'el campo no permite numero']
        },
        birthDate: {
            type: Date,
            required: [true, 'se requiere ingresar fecha de nacimiento ']
        },
        typeDocument: {
            type: String, 
            required: [true, 'el tipo de documento es obligatorio'],
            enum: {
                values: DOCUMENT_TYPES,
                message: '{VALUE} no es un tipo de documento valido'
            }
        },
        numberDocument: {
            type: String,
            required: [true, 'se requiere el número del documento'],
            unique: true,
            minlength: [7, 'solo se permite minimo 7 caracteres'],
            maxlength: [10, 'solo se permite maximo 10 caracteres'],
            match: [/^\d+$/, 'el campo no permite letras']
        },
        gender: {
            type: String,
            required: [true, 'el campo género es requerido'],
            enum: {
                values: GENDER,
                message: 'genero no registrado'
            }
        },
        email: {
            type: String,
            required: [true, 'el campo email es obligatorio'],
            unique: true,
            lowercase: true,
            match: [/.+@.+\..+/, 'ingresar un correo valido']
        },
        numberTelefono: {
            type: String,
            minlength: 8,
            maxlength: 10,
            match: [/^\d+$/, 'el campo no permite letras']
        },
        address: {
            type: String
        },
        degree: {
            type: String,
            required: [true, 'se requiere el grado del estudiante']
        },
        cluster: {
            type: String,
            required: [true, 'se requiere ingresar el grupo del estudiante']
        },
        status: {
            type: String,
            required: [true, 'se requiere ingresar el estado del estudiante'],
            enum: {
                values: STATUS,
                message: 'el estado ingresado no se encuentra registrado'
            }
        },
        schoolYear: {
            type: Number,
            required: [true, 'El año escolar es obligatorio. Debes ingresarlo de forma manual.']
        },
        isActive: {
            type: Boolean,
            required: [true, 'se requiere ingresa si el estudiantes esta activo o no']
        },

    }, { 
        timestamps: true, 
        toJSON: {virtuals: true},
        toObject: {virtuals: true }
    }
);

//virtuals para calcular la edad 
studentSchema.virtual('age').get(function () {
    if(!this.birthDate) return null;
    const diff = Date.now() - this.birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
});

const Student = model<StudentDocument>('Student', studentSchema);

export default Student;