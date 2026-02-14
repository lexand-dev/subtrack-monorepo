import {
  Injectable,
  type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseFactory } from '../factories/response.factory';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If is a paginated response
        if (data && data.items && data.meta) {
          return ResponseFactory.paginated(
            data.items,
            data.meta.page,
            data.meta.limit,
            data.meta.total,
          );
        }

        // Standard response
        return ResponseFactory.success(data);
      }),
    );
  }
}
