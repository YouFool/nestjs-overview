import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

// Nest interceptors work with both synchronous and asynchronous intercept() methods.
// We can simply switch the method to async if necessary.
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      // If it's cached, we never call the route handler, thus calling the cached response
      return of([]);
    }
    // Else, we call the route handler to calculate the result
    return next.handle();
  }
}
