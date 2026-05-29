import { ZodType } from "zod"
import { Request, Response, NextFunction } from "express"

/**
 * Middleware para validar los datos enviados en el body usando un esquema Zod.
 *
 * @param schema - Esquema de validación Zod que se aplicará al body de la petición.
 * @returns Middleware de Express que valida el body y responde con errores 400 si la validación falla.
 *
 * @example
 * router.post('/ruta', validateData(miSchema), controlador)
 */
export const validateData = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }
        req.body = result.data;
        return next();
    };
};