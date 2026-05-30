import { createLogger, format, transports, Logger as WinstonLogger } from "winston";
import dotenv from "dotenv";

dotenv.config();

export class Logger {
    private static instance: WinstonLogger;

    private constructor() {}

    public static getInstance(): WinstonLogger {
        if (!Logger.instance) {
            const isDevelopment = (process.env.development || 'development') === 'development';

            const devFormat = format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                format.colorize({ all: true }),
                format.printf(({ timestamp, level, message, ...meta }) => {
                    const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
                    return `[${timestamp}] [${level}] ${message}${metaString}`;
                })
            );

            const prodFormat = format.combine(
                format.timestamp(),
                format.json()
            )

            Logger.instance = createLogger({
                level: isDevelopment ? 'debug' : 'info',
                transports: [
                    new transports.Console({
                        format: isDevelopment ? devFormat : prodFormat,
                    }),
                    new transports.File({
                        filename: 'logs/error.log',
                        level: 'error',
                        format: prodFormat,
                    })
                ],
            });
        }

        return Logger.instance;
    }

    public static info(message: string, meta?: any): void {
        Logger.getInstance().info(message, meta);
    }

    public static error(message: string, error?: Error | any): void {
        if (error instanceof Error) {
            Logger.getInstance().error(message, { message: error.message, stack: error.stack });
        } else {
            Logger.getInstance().error(message, error);
        }
    }

    public static warn(message: string, meta?: any): void {
        Logger.getInstance().warn(message, meta);
    }

    public static debug(message: string, meta?: any): void {
        Logger.getInstance().debug(message, meta)
    }
}