import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './component/app.component';
import { MenuComponent } from './component/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { GameComponent } from './component/game.component';
import { NgDragDropModule } from 'ng-drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    NgDragDropModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }