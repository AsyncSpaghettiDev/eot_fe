export class TableHasActiveOrdersException extends Error {
    constructor() {
        super(`La mesa tiene ordenes activas`);
        this.name = "TableHasActiveOrdersException";
    }
}

export class TableHasNoCurrentActivityException extends Error {
    constructor() {
        super(`La mesa no tiene actividad`);
        this.name = "TableHasNoCurrentActivityException";
    }
}

export class InvalidCredentialsException extends Error {
    constructor() {
        super('Las credenciales son incorrectas, prueba de nuevo');
        this.name = "InvalidCredentialsException";
    }
}