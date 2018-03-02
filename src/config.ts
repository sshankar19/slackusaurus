
import * as path from 'path';

/**
 * Interface for application configuration settings
 * 
 * @interface Config
 */
interface Config {
    root: string;
    name: string;
    port: number;
    env: string;
    debug: boolean;
    version: string;
}

// environment
const env: string = process.env.NODE_ENV || 'development';

// default settings are for development environment
const config = {
    name: 'API Server',
    env: env,
    debug: process.env.DEBUG || true,
    root: path.join(__dirname, '/'),
    port: 8888,
    version: '1.0.0',
};

export { config };