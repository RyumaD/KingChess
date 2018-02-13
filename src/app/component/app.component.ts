import { Component, trigger, state, animate, transition, style, keyframes } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../class/User';
import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import * as sha1 from 'js-sha1';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})
export class AppComponent implements OnInit{
  public flagMenu: boolean = false;
  private flagAuth: boolean = false;
  public flaglog: boolean = false;
  public wantregister: boolean = false;
  public buttreg: boolean = true;
  public buttlog: boolean = false;
  public player: User;
  title = 'KingChess';
  public login:User = new User('ryumad','azertyuiop');
  public signin:User = new User('','');
  public username: string = "";
   
  private token: string; 

  
  ngOnInit(): void {
    var session = parseInt(localStorage.getItem('expire'));
    console.log(session);
    console.log(this.flagAuth);
    if(session != NaN){
      if( session < Date.now()){
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        this.flagAuth = false;
        console.log(this.flagAuth);
      }
      else{
        this.token = localStorage.getItem('token')
        this.service.getUserByToken(this.token)
        .then( (data) => {
            console.log(data);
            this.username = data.json().id.username;
            if(data.json().success != false){
              this.flagAuth = true;
              this.accessToMenu();
            }
        } );
      } 
    }
  }
  
  constructor(private service: ApiService){

  }

  LogIn(){
    let user:User = new User(this.login.getUsername(),sha1(this.login.getPassword()));
    this.service.postLogIn(user,sha1(this.randomNumber(100,999)+this.login.getUsername()))
      .then( (data) => {
          console.log(data);
          if(data.json().success == false){
            localStorage.removeItem('token');
            localStorage.removeItem('expire');
          }
          else{
            localStorage.setItem('expire', JSON.stringify(Date.now()+60000));
            localStorage.setItem('token', data.json().token);
            this.accessToMenu();
            this.flagAuth = true;
            this.username = data.json().id.username;
          }
      } );
  }

  SignIn(){
    let user:User = new User(this.signin.getUsername(),sha1(this.signin.getPassword()));
    console.log(user);
    this.service.postSignin(user).then( (data) => { console.log(data); } );
  }

  switchlog(bool){
    this.wantregister = bool;
    switch (this.wantregister) {
      case true:
        this.wantregister
        this.buttlog = true;
        this.buttreg = false;
        break;
    
      case false:
        this.buttreg = true;
        this.buttlog = false;
        break;
    }
  }
  randomNumber(min,max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
  }
  accessToMenu(){
    this.flagMenu = true;
  }
}