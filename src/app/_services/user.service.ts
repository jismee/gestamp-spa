import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSales(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('search', userParams.search);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get</*User[]*/any[]>(this.baseUrl + 'Crud', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getSale(id): Observable<User> {
    return this.http.get</*User*/any>(this.baseUrl + 'Crud/' + id);
  }

  updateSale(id: number, orderId: number, sale: any) {
    return this.http.put(this.baseUrl + 'Crud/' + id + '/' + orderId, sale);
  }

  addSale(id: number, sale: any) {
    return this.http.post(this.baseUrl + 'Crud/' + id, sale);
  }

  removeSale(id: number, orderId: number) {
    return this.http.delete(this.baseUrl + 'Crud/' + id + '/' + orderId);
  }

}
