import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscriber } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from './service/user.service';
import { User } from './interface/user';

// export interface UserData {
//     id:number;
//     name:string;
//     email:string;
//     gender:string;
//     status:string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'task1';
  // private user: User = {
  //   'id': 5,
  //   'name': 'Updated name',
  //   'username': 'updated username',
  //   'email': 'updatedemail@april.biz',
  //   'address': {
  //     'street': 'Kulas Light',
  //     'suite': 'Apt. 556',
  //     'city': 'Gwenborough',
  //     'zipcode': '92998-3874',
  //     'geo': {
  //       'lat': '-37.3159',
  //       'lng': '81.1496'
  //     }
  //   },
  //   'phone': '1-770-736-8031 x56442',
  //   'website': 'hildegard.org',
  //   'company': {
  //     'name': 'pdated company name',
  //     'catchPhrase': 'Multi-layered client-server neural-net',
  //     'bs': 'harness real-time e-markets'
  //   }
  // }

  private user: any = {
      'id': 4,
      'name': 'patched name',
      'username': 'patched username',
    }

  fileStatus = {status: '', percentage: 0};


  constructor(private userService: UserService){}

  ngOnInit(): void {
    //this.onUpdateUser();
    // this.onPatchUser();
    this.onGetUsers();
    //this.onGetUser();
    //this.onCreateUser();
    this.onDeleteUser();
    this.onGetUsers();

  }

  onGetUsers(): void{
    this.userService.getUsers().subscribe({
      next: (response) => console.table(response),
      error: (error: any) => console.log(error),
      complete: () => console.log("Done getteing all users.")
  });
  }

  onGetUser(): void{
    this.userService.getUser().subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log("Done getteing user details.")
  });
  }

  onCreateUser(): void{
    this.userService.createUser(this.user).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log("Done createing user.")
  });
  }

  onUpdateUser(): void{
    this.userService.updateUser(this.user).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log("Done updating user data.")
  });
  }

  onPatchUser(): void{
    this.userService.patchUser(this.user).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log("Done patching user data.")
  });
  }

  onDeleteUser(): void{
    this.userService.deleteUser(5).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log("Done deleting user.")
  });
  }
  

  onUploadFile(files: File[]): void{
    console.log(files);
    const formData = new FormData();
    for(const file of files){
      formData.append('files', file, file.name)
    }
    this.userService.uploadFile(formData).subscribe(
      (event) => {
        switch(event.type){
          case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
            console.log(event);
            // this.fileStatus.percentage = Math.floor(100*event.loaded / event.total);
            this.fileStatus.percentage = Math.floor(100*event.loaded / event.type);
            this.fileStatus.status = 'progress';
            console.log(this.fileStatus);
            break;
          case HttpEventType.Response:
            if(event.status ===200){
              console.log(event);
              this.fileStatus.percentage = 0;
              this.fileStatus.status = 'done';
              console.log(this.fileStatus);
              break;
            }
            break;
        }
      },
      (error: any) => console.log(error),
      ()=> console.log('Done uploading file.')
    );
  }







  //for training ....
  // constructor(){
  //   type HttpResponse = {code:number, data: string};

  //   const observable = new Observable<HttpResponse>(subscriber => {
  //     console.log("Inside subscriper ..");
  //     subscriber.next({code:200, data: 'this is data 1...'});
  //     subscriber.next({code:200, data: 'this is data 2...'});
  //     subscriber.next({code:200, data: 'this is data 3...'});
  //     // subscriber.error({code:500, data: 'an error occured!'});
  //     setTimeout(() => {
  //       subscriber.next({code:200, data: 'this is data 3...'});
  //       subscriber.complete();
  //     }, 3*1000);
  //   });
  //   observable.subscribe({
  //     next(response: HttpResponse){
  //       console.log('got Response: ', response);
  //     },
  //     error(error: any){
  //       console.log('something wrong occured : ', error);
  //     },
  //     complete(){
  //       console.log('done..');
  //     }
  //   });
  // }

}


// export class AppComponent implements OnInit{
//   title = 'task1';
//   listUsersUrl = "https://gorest.co.in/public/v2/users";
//   // token from : https://gorest.co.in/my-account/access-tokens
//   token = "e5af49df7ff760a2b50a4efdbdcd8b23995712cf3427aba719c44fd0fc7972d0";
//   createUserUrl = "https://gorest.co.in/public/v2/users?access-token="+this.token;
//   public getJsonValue: any;
//   public postJsonValue: any;
  
//   displayedColumns: string[] = ['id','name','email','gender','status'];
//   displayedColumnsData: string[] = ['id','name','email','gender','status'];

//   all_users_data: UserData[]=[
//     {id:4443654, name:"Faatima", gender:"female", email:"fatima22@gmail.com", status:"active"},
//     {id:332343, name:"asdgasg", gender:"male", email:"sdfsda@gmail.com", status:"non-active"},
//   ];

//   dataSource = new MatTableDataSource (this.all_users_data);

//   constructor(private http: HttpClient){}

//   ngOnInit() {
//       this.dataSource.sort = this.sort;
//     }

//   // ngOnInit(): void {
//   //   this.ELEMENT_DATA =this.listUsers();
//   //   // this.dataSource = this.listUsers();
//   //   // this.createUser({"name":"Faatima", "gender":"female", "email":"fatima22@gmail.com", "status":"active"});
//   // }
//   // List users > from : https://gorest.co.in/
//   public listUsers() {
//     return this.http.get<UserData[]>(this.listUsersUrl).pipe(
//       map(all_users_data =>
//         all_users_data.map(data => {
//           return <UserData>{
//             id:data['id'],
//             name:data['name'],
//             email:data['email'],
//             gender:data['gender'],
//             status:data['status']
//           }
//         })
//       ),
//       tap((res: UserData[]) => console.log(res))
//     );
//   }
//   // public listUsers(){
//   //   this.http.get(this.listUsersUrl).subscribe((data) =>{
//   //     console.log(data);
//   //     this.getJsonValue = data;
//   //     return data;
//   //   });
//   // }

//   // Create user > from : https://gorest.co.in/
//   // curl -i 
//   // -H "Accept:application/json" -H "Content-Type:application/json" -H "Authorization: Bearer ACCESS-TOKEN" -XPOST "https://gorest.co.in/public/v2/users" -d '{"name":"Tenali Ramakrishna", "gender":"male", "email":"tenali.ramakrishna@15ce.com", "status":"active"}'
//   // example result data :
//   // {
//   //   "id": 5841033,
//   //   "name": "Fatima",
//   //   "email": "fgafda@gmail.com",
//   //   "gender": "female",
//   //   "status": "active"
//   // }
//   public createUser(user_data: any){
//     const header = new HttpHeaders({
//       contentType: 'application/json'
//     });
//     this.http.post(this.createUserUrl,user_data, {headers: header}).subscribe((data) =>{
//       console.log(data);
//       this.postJsonValue = data;
//     });
//   }

//     // @ViewChild(MatSort) sort: MatSort;
//     @ViewChild(MatSort, {static: true}) sort!: MatSort;
//   logData(row: any){
//     console.log(row);
//   }

//   applyFilter(filterValue: string){
//     this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
//   }
// }


