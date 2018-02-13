import {RequestOptions, Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../class/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    private url:string = "http://localhost:8888/KingchessAPI/";
    headers: Headers;
    options: RequestOptions;
    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
        this.http = http
    }
    
    postLogIn(user:User,token): Promise<any>{
        let userapi= {username: user.getUsername(), password: user.getPassword(),token:token}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'login',body,this.options).toPromise();
    }
    postSignin(user): Promise<any>{
        let userapi= {username: user.getUsername(), password: user.getPassword()}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'signin',body).toPromise();
    }
    getUserById(user:User): Promise<any>{
        let userapi= {id: user.getId()}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'userid',body).toPromise();
    }
    getUserByToken(token: string): Promise<any>{
        let userapi= {token: token}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'token',body).toPromise();
    }
    getUserByUsername(username: string): Promise<any>{
        let userapi= {username: username}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'admin',body).toPromise();
    }

    getUniteInfo(unite: string){
        let userapi= {name: unite}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'unite',body).toPromise();
    }
    getAllUnite(){
        return this.http.get(this.url+'allunite').toPromise();
    }
}