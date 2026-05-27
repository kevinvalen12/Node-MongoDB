import { z } from "zod";
import { DOCUMENT_TYPES, GENDER, STATUS } from "../interfaces/student.interface";

export const StudentSchema = z.object({
    fullName: z.string()
        .min(3, 'El nombre completo debe de tener minimo 3 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'el campo no permite numeros'),

    birthDate: z.coerce.date().refine(
        (date) => !isNaN(date.getTime()),
        { message: 'La fecha de nacimiento no es valida' }
    ),

    typeDocument: z.enum(DOCUMENT_TYPES, {
        error: `El tipo de documento debe ser: ${DOCUMENT_TYPES.join(', ')}`
    }),

    numberDocument: z.string()
        .min(7, 'Solo se permite minimo 7 caracteres')
        .max(10, 'Solo se permite maximo 10 caracteres')
        .regex(/^\d+$/, 'El campo no permite letras'),
    
    gender: z.enum(GENDER, {
        error: `Solo se permite dos generos ${GENDER.join(', ')}`
    }),

    email: z.string()
        .email('EL email no es valido')
        .max(100, 'El email solo se permite 100 caracteres')
        .regex(/.+@.+\..+/, 'Ingresar un email valido'),
    
    numberTelefono: z.string()
        .min(8, 'El numero telefonico solo permite minimo 8 caracteres')
        .max(10, 'El numero telefonico solo perimite maximo 10 caracteres')
        .regex(/^\d+$/, 'El campo no permite letras'),

    address: z.string()
        .min(5, 'La direccion debe de tener minimo 5 caracteres')
        .max(200, 'La direccion debe de tener maximo 200 caracteres'),
    
    degree: z.string({ error: 'el grado no es valido' }),

    cluster: z.string({ error: 'el cluster no es valido' }),

    status: z.enum(STATUS, {
        error: `El estado debe de ser ${STATUS.join(', ')}`
    }),

    schoolYear: z.number()
        .min(1996, 'El año escolar no es valido')
        .max(new Date().getFullYear(), ' El año escolar no puede ser futuro'),

    isActive: z.boolean().default(true)
})

export const studentUpdateSchame = StudentSchema.partial();

export type StudentDto = z.infer<typeof StudentSchema>;
export type StudentUpdateDto = z.infer<typeof studentUpdateSchame>;