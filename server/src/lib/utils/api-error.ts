export class ApiError extends Error {
  _status: number;
  _message: string;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
    this._message = message;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }
}
