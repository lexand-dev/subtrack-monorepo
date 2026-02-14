import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { type Response, type Request } from 'express';
import { ResponseFactory } from '../factories/response.factory';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    // Using the ResponseFactory to create a consistent error response structure
    const errorBody = ResponseFactory.error(
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.message,
      status,
      exceptionResponse.error, // Include the error type if available
      request.url, // Include the request path for better debugging
    );

    response.status(status).json(errorBody);
  }
}
