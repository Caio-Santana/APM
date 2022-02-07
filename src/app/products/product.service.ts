import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl: string = 'api/products/products.json';

    private _http: HttpClient;
    constructor(http: HttpClient) {
        this._http = http;
    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handlerError));
    }

    private handlerError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An errod occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}