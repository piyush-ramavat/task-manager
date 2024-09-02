export class ApiError extends Error {
  _status: number;
  _message: string;
  _data?: Object;

  constructor(status: number, message: string, data?: Object) {
    super(message);
    this._status = status;
    this._message = message;
    this._data = data;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  get data() {
    return this._data;
  }
}
