import { HttpException } from "@nestjs/common";

export class TooManyRequestsException extends HttpException {
  constructor() {
    super('Too Many Requests', 429);
  }
}