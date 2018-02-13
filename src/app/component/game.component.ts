import { Component, trigger, state, animate, transition, style, keyframes, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../class/User';
import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import * as sha1 from 'js-sha1';
import { OnInit } from '@angular/core';
import { parse } from 'url';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ApiService],
  })
  
export class GameComponent implements OnInit{
  ngOnInit(): void {
    this.service.getAllUnite()
      .then( (data) => {
        console.log(data);
        var array = data.json().id;
        array.forEach(element => {
          this.items.push(element);
        });
    });
  }
  constructor( private service: ApiService ){}
  items = [];
  draggeditem = [];
  public flagPlay: boolean = false;

  onItemDrop(e: any, number: string) {
    console.log(e.dragData);
    this.draggeditem[number] = e.dragData.name;
    console.log(this.draggeditem);
  }

  @Input() 
  public username: string;
  @Input() 
  public gameTuto: boolean;

  startGame(){
    this.flagPlay = true;
  }
  reloadGame(){
    this.flagPlay = false;
  }
  moveUnit(number:string){
    var unite = this.draggeditem[number];
    var numb =parseInt(number)
    if(unite != null){
      var result = this.items.filter(function( obj ) {
        return obj.name == unite;
      });
      switch (result[0]['mouvement']) {
        case 1:
          this.canMove(numb-8,number);//avant
          this.canMove(numb-1,number);//gauche
          this.canMove(numb+1,number);//droite
          this.canMove(numb+8,number);//arriere
          break;
      
        case 2:
          this.canMove(numb-16,number);
          this.canMove(numb-8,number);
          this.canMove(numb-9,number);
          this.canMove(numb-7,number);
          this.canMove(numb-2,number);
          this.canMove(numb-1,number);
          this.canMove(numb+1,number);
          this.canMove(numb+2,number);
          this.canMove(numb+7,number);
          this.canMove(numb+9,number);
          this.canMove(numb+8,number);
          this.canMove(numb+16,number);
          break;
      }
    }
  }
  canMove(number, start){
    if(number > 64 || number < 1){
      return false;
    }
    else if(start == 8 || start == 16 || start == 24 || start == 32 || start == 40 || start == 48 || start == 56 || start == 64){
      if(start+1 == number || start+2 == number || start+7 == number || start-7 == number){
        return false;
      }
    }
    else if(start == 1 || start == 9 || start == 17 || start == 25 || start == 33 || start == 41 || start == 49 || start == 57){
      if(start-1 == number || start-2 == number || start+9 == number || start-9 == number){
        return false;
      }
    }
    else{
      var elem = document.getElementById("case"+number);
      elem.style.backgroundColor = 'green';
    }
  }
}