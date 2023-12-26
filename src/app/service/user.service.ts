import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly moreParams = ['test1', 'test2'];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<HttpEvent<User[]>>{
    // let myHeaders = new HttpHeaders({'my_header': 'header value'});
    // myHeaders = myHeaders.set('id', '1234');
    // myHeaders = myHeaders.append('id', '0000');
    // return this.http.get<User[]>(`${this.apiUrl}/users`, {headers: myHeaders});

    // let myParams = new HttpParams().set('page','5').set('sort','true');
    // myParams = myParams.append('name', 'Fatima');

    //const theParams = {['testList'] : this.moreParams}; // 'testList' is the keys , this.moreParams is the values
    // let myParams = new HttpParams({fromObject: theParams}); //resulted url : https://jsonplaceholder.typicode.com/users?testList=test1&testList=test2

    // let myParams = new HttpParams({fromString: 'name=Fatima&pass=true'}); //resulted url : https://jsonplaceholder.typicode.com/users?name=Fatima&pass=true
    // return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams});

    return this.http.get<User[]>(`${this.apiUrl}/users`, {observe: 'events'});

  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/1`);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/users`,user);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`,user);
  }

  patchUser(user: User): Observable<User>{
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`,user);
  }

  deleteUser(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

   test(){
    let fileData = {'test':'test'};
    let headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Host': 'usertoken',
                'Authorization': 'xyz',
                'SOAPAction:': 'test'
              });
 let options = { headers: headers };

    return this.http.post('http://localhost:5050/api/bond/validatePolicy/106881706', fileData, options)
    }



  uploadFile(formData: FormData): Observable<HttpEvent<string[]>>{

    return this.http.post<string[]>('http://localhost:90000/file/upload', formData,
    {observe: 'events', reportProgress: true});
  }

}
