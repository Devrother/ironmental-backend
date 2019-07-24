export class NotFoundError extends Error {
  constructor(message='Not Found Error') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends Error {
  constructor(message='Bad Request') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor)
  }
}

export class UnauthorizedError extends Error {
  constructor(message='Unauthorized Error') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor)
  }
}