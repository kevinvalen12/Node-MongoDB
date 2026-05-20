// Este arreglo es estricto y de solo lectura
export const DOCUMENT_TYPES = ['CC', 'TI', 'CE'] as const;
export const GENDER = ['Masculino', 'Femenino'] as const;
export const STATUS = ['Activo', 'Retirado', 'Transferido'] as const;

export type TypeDocument = typeof DOCUMENT_TYPES[number];
export type Gender = typeof GENDER[number];
export type Status = typeof STATUS[number];

export interface StudentInterface {
    fullName: string,
    birthDate: Date,
    typeDocument: TypeDocument,
    numberDocument: string,
    gender: Gender,
    email: string,
    numberTelefono: string,
    address?: string,
    degree: string,
    cluster: string,
    status: Status,
    schoolYear: number,
    isActive: boolean,
}