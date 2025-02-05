export class Exception extends Error {
  code: string;
  statusCode: number;
  constructor(message: string, code: string, statusCode?: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode || 500;
  }
}
