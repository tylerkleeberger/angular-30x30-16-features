import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessagesService } from 'src/app/messages.service';
import { Contact } from './contact';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  model = 'contacts';

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

  private localHost = 'http://localhost:3000/contacts'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  //MESSAGE LOG Base
  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
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
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.getUrl())
    .pipe(tap(_=> this.log('fetched contacts')),
    catchError(this.handleError<Contact[]>('getContacts', []))
    );

    //ALTERNATIVE ROUTE PARAM with Mock-Data
    // this.messageService.add('ContactSerice: fetched Contacts');
    // return of(CONTACTS);
  }

  //GET (BY ID) + ROUTE PARAMS
  getContact(id: number | string): Observable<Contact> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<Contact>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Contact>(`getContact id=${id}`)));

    //ALTERNATIVE with Mock-Data
    // return this.getContacts().pipe(
    //   map((contacts: Contact[]) => contacts.find(contact => contact.id === +id)!));
  }

/////////////////////////OTHER METHODS//////////////////////////////

//Update contact on server -- PUT
updateContact(contact: Contact): Observable<any> {
  return this.http.put(this.getUrlWithID(contact.id), contact, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${contact.id}`)),
    catchError(this.handleError<any>('updateContact'))
  );
}

//Add new contact on server -- POST
addContact(contact: Contact): Observable<Contact> {
  return this.http.post<Contact>(this.getUrl(), contact, this.httpOptions)
  .pipe(tap((newContact: Contact) => this.log(`added contact with id=${newContact.id}`)),
  catchError(this.handleError<Contact>('addContact'))
  )
}

//Delete contact on server -- DELETE
deleteContact(id: number): Observable<Contact> {
  const url = `${this.getUrl()}/${id}`;
  return this.http.delete<Contact>(url, this.httpOptions)
  .pipe(tap(_ => this.log(`deleted contact id=${id}`)),
  catchError(this.handleError<Contact>('deleteContact'))
  );
}

//Search Feature -- GET
searchContacts(term: string): Observable<Contact[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Contact[]>(`${this.localHost}/?name_like=${term}`)
  .pipe(tap(x => x.length ? 
    this.log(`found contacts matching "${term}"`) :
    this.log(`no contacts matching "${term}"`)),
    catchError(this.handleError<Contact[]>('searchContacts', []))
  );
}

}
