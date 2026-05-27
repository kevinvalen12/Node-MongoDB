import { faker } from '@faker-js/faker/locale/es';
import { DOCUMENT_TYPES, GENDER, STATUS } from '../../interfaces/student.interface';

const degree = [
    "Primaria 1°",
    "Primaria 2°",
    "Primaria 3°",
    "Primaria 4°",
    "Primaria 5°",
    "Secundaria 6°",
    "Secundaria 7°",
    "Secundaria 8°",
    "Secundaria 9°",
    "Media 10°",
    "Media 11°"
];

const cluster = [
    "1-1",
    "1-2",
    "2-1",
    "2-2",
    "3-1",
    "3-2",
    "4-1",
    "4-2",
    "5-1",
    "5-2",
    "6-1",
    "6-2",
    "7-1",
    "7-2",
    "8-1",
    "8-2",
    "9-1",
    "9-2",
    "10-1",
    "10-2",
    "11-1",
    "11-2"
];

export const studentsData = Array.from({ length: 50 }, () => ({
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
    birthDate: new Date(faker.date.between({
        from: '2004-01-01T00:00:00.000Z',
        to: '2024-12-31T23:59:59.999Z'
    })),
    typeDocument: faker.helpers.arrayElement([...DOCUMENT_TYPES]),
    numberDocument: faker.string.numeric({ length: { min: 7, max: 10 } }),
    gender: faker.helpers.arrayElement([...GENDER]),
    email: faker.internet.email(),
    numberTelefono: faker.string.numeric(10),
    address: faker.location.streetAddress(),
    degree: faker.helpers.arrayElement(degree),
    cluster: faker.helpers.arrayElement(cluster),
    status: faker.helpers.arrayElement([...STATUS]),
    schoolYear: faker.helpers.arrayElement([2022, 2023, 2024]),
    isActive: faker.datatype.boolean()
}));