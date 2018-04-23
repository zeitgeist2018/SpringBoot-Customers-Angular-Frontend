import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/retry';
import swal from 'sweetalert2';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

    private retries = 3;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .retry(this.retries)
            .catch((err: HttpErrorResponse) => {
                swal({
                    title: 'Connection error',
                    text: 'It seems that you are not connected to internet.',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Retry'
                }).then(result => {
                    if (result.value) {
                        return next.handle(request);
                    }
                });
                return Observable.empty<HttpEvent<any>>();
            });
    }

}
