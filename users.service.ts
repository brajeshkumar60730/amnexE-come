import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpclient: HttpClient) { }
  baseurl = "https://localhost:7286/Api/Users";

  GetUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.baseurl)
  }

  CreateUsers(user: Users): Observable<Users> {
   user.id = 1
    return this.httpclient.post<Users>(this.baseurl, user)
  }

  UpdateUsers(user: Users): Observable<Users> {
    return this.httpclient.put<Users>(this.baseurl + '/' + user.id, user);
  }

  DeleteUsers(id:number): Observable<Users> {

    return this.httpclient.delete<Users>(this.baseurl + '/' + id );
  }
}
