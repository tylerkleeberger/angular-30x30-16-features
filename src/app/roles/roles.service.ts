import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessagesService } from 'src/app/messages.service';
import { Role } from './role';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  model = 'roles';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  //URL Base
  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlWithID(id) {
    return `${this.getUrl()}/${id}`;
  }

  private localHost = 'http://localhost:3000/roles'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  //MESSAGE LOG Base
  private log(message: string) {
    this.messageService.add(`RolesService: ${message}`);
  }

  //HANDLE ERROR Base
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //send error to remote login infrastructure (must set up separately)
      console.error(error);
      //transforms error for user consumption (create an error message)
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //GET + ROUTE PARAMS
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.getUrl())
    .pipe(tap(_=> this.log('fetched roles')),
    catchError(this.handleError<Role[]>('getRoles', []))
    );

  }

  //GET (BY ID) + ROUTE PARAMS
  getRole(id: number | string): Observable<Role> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<Role>(url).pipe(tap(_ => this.log(`fetched role id=${id}`)),
    catchError(this.handleError<Role>(`getRole id=${id}`)));

    //ALTERNATIVE with Mock-Data
    // return this.getRoles().pipe(
    //   map((roles: Role[]) => roles.find(role => role.id === +id)!));
  }

/////////////////////////OTHER METHODS//////////////////////////////

//Update role on server -- PUT
updateRole(role: Role): Observable<any> {
  return this.http.put(this.getUrlWithID(role.id), role, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${role.id}`)),
    catchError(this.handleError<any>('updaterole'))
  );
}

//Add new role on server -- POST
addRole(role: Role): Observable<Role> {
  return this.http.post<Role>(this.getUrl(), role, this.httpOptions)
  .pipe(tap((newRole: Role) => this.log(`added role with id=${newRole.id}`)),
  catchError(this.handleError<Role>('addRole'))
  )
}

//Delete role on server -- DELETE
deleteRole(id: number): Observable<Role> {
  const url = `${this.getUrl()}/${id}`;
  return this.http.delete<Role>(url, this.httpOptions)
  .pipe(tap(_ => this.log(`deleted role id=${id}`)),
  catchError(this.handleError<Role>('deleteRole'))
  );
}

//Search Feature -- GET
searchroles(term: string): Observable<Role[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Role[]>(`${this.localHost}/?name_like=${term}`)
  .pipe(tap(x => x.length ? 
    this.log(`found roles matching "${term}"`) :
    this.log(`no roles matching "${term}"`)),
    catchError(this.handleError<Role[]>('searchroles', []))
  );
}

}
