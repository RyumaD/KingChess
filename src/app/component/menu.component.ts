import { Component, trigger, state, animate, transition, style, keyframes, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../class/User';
import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import * as sha1 from 'js-sha1';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ApiService],
    animations: [
        trigger('flyInOut', [
          state('in', style({opacity: 1, transform: 'translateX(0)'})),
          transition('void => *', [
            style({
              opacity: 0,
              transform: 'translateY(100%)'
            }),
            animate('0.2s ease-in')
          ]),
        ]),
      ]
  })
  
  export class MenuComponent implements OnInit{
        ngOnInit(): void {
            this.isAdmin();
        }
        @Input() 
        public username: string;
        public gameTuto: boolean = false;
        public flagProfil: boolean = false;
        public flagMenu: boolean = true;
        private flagAdmin: boolean = false;
        public flagForum: boolean = false;
        private validAdmin: boolean = false;
        public gameOn: boolean = false;
        constructor( private service: ApiService ){}

        LogOut(){
            localStorage.removeItem('token');
            localStorage.removeItem('expire');
            window.location.reload()
        }
        goProfil(){
            this.flagProfil = true;
            this.flagMenu = false;
            this.flagAdmin = false;
            this.flagForum = false;
        }
        goAdmin(){
            this.flagAdmin = true;
            this.flagMenu = false;
            this.flagForum = false;
            this.flagProfil = false;
        }
        goForum(){
            this.flagForum = true;
            this.flagMenu = false;
            this.flagProfil = false;
            this.flagAdmin = false;
        }
        goGame(option: string){
            if(option == "play"){
                this.gameOn = true;
            }
            else if(option == "tuto"){
                this.gameOn = true;
                this.gameTuto = true;
            }
        }
        goMenu(){
            this.flagForum = false;
            this.flagProfil = false;
            this.flagAdmin = false;
            this.flagMenu = true;
        }
        isAdmin(){
            this.service.getUserByUsername(this.username)
            .then( (data) => {
               var admin = data.json().id.admin;
               if(admin == "true"){
                    this.validAdmin = true;
               }
            });
        }
  } 