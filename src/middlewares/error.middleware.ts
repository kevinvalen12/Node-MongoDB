import { Request, Response, NextFunction } from "express";

/**
 * Clase personalizada para manejar errores de la aplicación.
 * Extiende la clase Error nativa de JavaScript para capturar
 * tanto el mensaje de error como el código de estado HTTP.
 * 
 * @class AppError
 * @extends {Error}
 */
export class AppError extends Error {
    /**
     * Crea una instancia de AppError.
     * 
     * @param {string} message - Mensaje descriptivo del error
     * @param {number} statusCode - Código de estado HTTP (ej: 400, 404, 500)
     */
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.name = 'AppError'
    }
}

/**
 * Middleware manejador de errores de Express.
 * Intercepta errores ocurridos en la aplicación y devuelve respuestas HTTP apropiadas.
 * 
 * Comportamiento:
 * - Si el error es una instancia de AppError: devuelve el statusCode y mensaje personalizados
 * - Otros errores: devuelve estado 500 con mensaje genérico de error interno
 * 
 * @param {Error} err - Error capturado durante la ejecución
 * @param {Request} _req - Objeto de solicitud
 * @param {Response} res - Objeto de respuesta para enviar el error al cliente
 * @param {NextFunction} _next - Siguiente middleware
 * 
 * @returns {void} Envía respuesta JSON con el error al cliente
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    // Verifica si el error es un AppError personalizado
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Error genérico - no queremos exponer detalles internos
    return res.status(500).json({ message: 'Error interno en el servidor' })
}